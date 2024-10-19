interface FetchOptions extends RequestInit {
    params?: Record<string, string>;
  }
  
  export const fetchData = async <T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> => {
    const {
      method = 'GET',
      body,
      params,
      headers: customHeaders,
      ...restOptions
    } = options;
  
    const token = localStorage.getItem('token');
    
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...customHeaders,
    });
  
    const url = new URL(`${import.meta.env.VITE_API_URL}${endpoint}`);
    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }
  
    try {
      const response = await fetch(url.toString(), {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
        ...restOptions,
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Request failed with status ${response.status}`);
      }
  
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
  
      return await response.text() as T;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };
  
  export const get = <T>(endpoint: string, options?: FetchOptions) => 
    fetchData<T>(endpoint, { ...options, method: 'GET' });
  
  export const post = <T>(endpoint: string, data: any, options?: FetchOptions) => 
    fetchData<T>(endpoint, { ...options, method: 'POST', body: data });
  
  export const put = <T>(endpoint: string, data: any, options?: FetchOptions) => 
    fetchData<T>(endpoint, { ...options, method: 'PUT', body: data });
  
  export const del = <T>(endpoint: string, options?: FetchOptions) => 
    fetchData<T>(endpoint, { ...options, method: 'DELETE' });
  