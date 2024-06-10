export interface HttpClient {
   get(url: string): Promise<string>;
}

export class FetchHttpClient implements HttpClient {
   async get(url: string): Promise<string> {
      const response = await fetch(url);
      if (!response.ok) {
         throw new Error('Network response was not ok');
      }
      return response.text();
   }
}
