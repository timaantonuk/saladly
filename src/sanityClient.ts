import { createClient } from '@sanity/client';

// Конфигурация клиента для получения данных
const client = createClient({
  projectId: 'tgg25nr2', // Project ID из вашего файла конфигурации
  dataset: 'production', // Dataset (например, 'production')
  apiVersion: '2023-10-01', // Версия API (можно указать любую актуальную)
  useCdn: true, // Использовать CDN для кэшированных данных
});

export default client;
