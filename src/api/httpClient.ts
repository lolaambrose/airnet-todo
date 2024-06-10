export interface HttpClient {
   get(url: string): Promise<any>;
}

export class FetchHttpClient implements HttpClient {
   async get(url: string): Promise<any> {
      const response = await fetch(url);
      if (!response.ok) {
         throw new Error('Network response was not ok');
      }
      return response.text();
   }
}
