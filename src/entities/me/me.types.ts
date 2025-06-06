export interface MeResponse {
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}
