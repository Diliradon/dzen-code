export type AuthResponse = {
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
    };
    token: string;
  };
};
