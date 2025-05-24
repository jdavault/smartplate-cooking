import { Recipe } from '@/types/recipe';
import { GeneratedRecipe } from '@/interfaces/recipes';
import { postRequest, axios, AxiosError } from '@/libs/apiClient';
import { ChatCompletionResponse, ChatImageResponse } from '@/types/openai';

export async function generateRecipe(
  query: string,
  allergens: string[]
): Promise<Recipe> {
  try {
    // Format the allergens for the prompt
    const allergensText =
      allergens.length > 0
        ? `The recipe must avoid these allergens: ${allergens.join(', ')}.`
        : 'No specific allergens to avoid.';

    // Create a prompt for OpenAI
    const prompt = `
      Create a detailed recipe for "${query}". ${allergensText}
      
      Format the response as a JSON object with the following structure:
      {
        "title": "Recipe Title",
        "description": "Brief description of the dish",
        "ingredients": ["Ingredient 1", "Ingredient 2", ...],
        "instructions": ["Step 1", "Step 2", ...],
        "prepTime": "Time needed for preparation",
        "cookTime": "Time needed for cooking",
        "servings": number of servings,
        "difficulty": "easy/medium/hard",
        "tags": ["tag1", "tag2", ...],
        "searchQuery": "search query used to generate this recipe",
        "allergens": ["allergen1", "allergen2", ...]
        "createdAt": "timestamp",
        "updatedAt": "timestamp",
      }
      
      Be careful to avoid including any allergens mentioned in the allergensText.
      The allergens field should list potential allergens present in the recipe.
      Make sure all times are in minutes format (e.g., "15 minutes").
      Be specific with ingredient quantities. Replace imageUrl with a value for a URL to a generated recipe image.
    `;

    const response = await postRequest<ChatCompletionResponse>(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful culinary assistant that specializes in creating recipes. You always ensure recipes are detailed, practical, and follow proper cooking techniques. You are particularly mindful of allergens and dietary restrictions.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        },
      }
    );

    // Parse the response content as JSON
    const content = response.choices[0].message.content;
    const recipeData = cleanAndParse(content);

    // Create a unique ID
    const id = Date.now().toString();

    const imageUrl = await getRecipeImage(recipeData.title);

    const fullRecipeData = {
      id,
      ...recipeData,
      imageUrl,
      searchQuery: query,
      isFavorite: false,
    };
    console.log('FULL:', fullRecipeData);
    return fullRecipeData;
  } catch (error) {
    console.error('Error generating recipe:', error);

    // Log detailed error information
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('OpenAI API Error:', {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
      });

      // If the API key is invalid or there are authentication issues, fall back to mock data
      if (
        axiosError.response?.status === 401 ||
        axiosError.response?.status === 403
      ) {
        console.log(
          'Falling back to mock recipe generation due to API authentication error'
        );
        return generateMockRecipe(query, allergens);
      }
    }

    // For all other errors, fall back to mock data
    console.log('Falling back to mock recipe generation');
    return generateMockRecipe(query, allergens);
  }
}

export async function getRecipeImage(title: string): Promise<string> {
  //const defaultImageUrl =
  //  'https://oaidalleapiprodscus.blob.core.windows.net/private/org-pigNWK6KQYXhW9KadKfDpVGu/user-39kulMjtAc64ijuOibVGsWHQ/img-INkLrEdeZfwZAOWtZtX1rdSo.png?st=2025-05-24T16%3A26%3A18Z&se=2025-05-24T18%3A26%3A18Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-24T00%3A28%3A23Z&ske=2025-05-25T00%3A28%3A23Z&sks=b&skv=2024-08-04&sig=73pFuy8MrnJPjLNlEgfDCAGwCi1vnpImcBxf5E4IMXw%3D';
  // Default image URL in case of failure
  const defaultImageUrl = '../../assets/images/defaultPhoto.png';
  try {
    const response = await postRequest<ChatImageResponse>(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: `High quality food photo of ${title}, professional lighting, styled on a plate`,
        n: 1,
        size: '512x512',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        },
      }
    );

    return response?.data?.[0]?.url ?? defaultImageUrl;
  } catch (error) {
    console.error('Error generating recipe image:', error);
    return defaultImageUrl;
  }
}

function cleanAndParse(content: string): GeneratedRecipe {
  // Step 1: Remove code block markers (```json ... ```)
  const cleaned = content.replace(/```json\s*([\s\S]*?)\s*```/, '$1');

  // Step 2: Parse the resulting string as JSON
  return JSON.parse(cleaned);
}

// Mock function for testing and fallback purposes
function generateMockRecipe(query: string, allergens: string[]): Recipe {
  const id = Date.now().toString();
  const title = `${query} Recipe`;
  const options = {
    gluten: ['flour', 'bread', 'pasta', 'wheat'],
    dairy: ['milk', 'cheese', 'butter', 'cream'],
    eggs: ['egg', 'mayonnaise'],
    nuts: ['almonds', 'walnuts', 'cashews', 'pistachios'],
    peanuts: ['peanut butter', 'peanuts'],
    shellfish: ['shrimp', 'crab', 'lobster'],
    fish: ['salmon', 'tuna', 'cod'],
    soy: ['tofu', 'soy sauce', 'edamame'],
    sesame: ['sesame seeds', 'tahini'],
  };

  const ingredients = [
    'Salt and pepper to taste',
    'Olive oil',
    '1 onion, diced',
    '2 cloves garlic, minced',
  ];

  if (!allergens.includes('gluten') && query.toLowerCase().includes('pasta')) {
    ingredients.push('8 oz pasta');
  }

  if (!allergens.includes('dairy') && Math.random() > 0.5) {
    ingredients.push('1/2 cup grated parmesan cheese');
  }

  if (!allergens.includes('nuts') && Math.random() > 0.7) {
    ingredients.push('1/4 cup chopped walnuts');
  }

  const presentAllergens: string[] = [];
  Object.keys(options).forEach((allergen) => {
    if (!allergens.includes(allergen) && Math.random() > 0.7) {
      presentAllergens.push(allergen);
    }
  });

  return {
    id,
    title,
    imageUrl:
      'https://oaidalleapiprodscus.blob.core.windows.net/private/org-pigNWK6KQYXhW9KadKfDpVGu/user-39kulMjtAc64ijuOibVGsWHQ/img-INkLrEdeZfwZAOWtZtX1rdSo.png?st=2025-05-24T16%3A26%3A18Z&se=2025-05-24T18%3A26%3A18Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=8b33a531-2df9-46a3-bc02-d4b1430a422c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-24T00%3A28%3A23Z&ske=2025-05-25T00%3A28%3A23Z&sks=b&skv=2024-08-04&sig=73pFuy8MrnJPjLNlEgfDCAGwCi1vnpImcBxf5E4IMXw%3D',
    description: `A delicious ${query} recipe that's easy to make and full of flavor.`,
    ingredients,
    instructions: [
      'Prep all ingredients before starting.',
      'In a large pan, heat olive oil over medium heat.',
      'Add onions and garlic, cook until translucent.',
      'Add remaining ingredients and cook according to your taste.',
      'Serve hot and enjoy!',
    ],
    prepTime: '15 minutes',
    cookTime: '25 minutes',
    servings: 4,
    difficulty: 'medium',
    tags: [query, 'homemade', 'easy'],
    allergens: presentAllergens,
    searchQuery: query,
  };
}
