export default {
  name: 'salad',
  title: 'Salad',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Salad Name',
      type: 'string',
      validation: (rule: any) => rule.required().error(`Required to generate a new salad!`),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
    },
    {
      name: 'priceXl',
      title: 'Price XL (USD)',
      type: 'number',
    },
    {
      name: 'calories',
      title: 'Calories (kcal)',
      type: 'number',
    },
    {
      name: 'protein',
      title: 'Protein (grams)',
      type: 'number',
    },
    {
      name: 'carbs',
      title: 'Carbs (grams)',
      type: 'number',
    },
    {
      name: 'fat',
      title: 'Fat (grams)',
      type: 'number',
    },
    {
      name: 'weight',
      title: 'Weight (grams)',
      type: 'number',
    },
    {
      name: 'popularity',
      title: 'Popularity (from 1 to 5)',
      type: 'number',
    },
    {
      name: 'filters',
      title: 'Filters (vegetarian, meat, hot, pasta)',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'Vegetarian', value: 'vegetarian'},
              {title: 'Meat', value: 'meat'},
              {title: 'Hot', value: 'hot'},
              {title: 'Pasta', value: 'pasta'},
            ],
            layout: 'tags',
          },
        },
      ],
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Для изменения фокуса изображения
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        },
      ],
    },
  ],
}
