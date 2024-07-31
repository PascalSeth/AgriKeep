// types.ts (or any appropriate file for type definitions)

export type RootStackParamList = {
  OnboardHome:undefined,
  SignIn: undefined;
  SignUp: undefined;
  Category:undefined,
  Home: undefined;
  'Item-List': { category: string; id: string };
  'ProductScreen': { subcategoryId: string; subcategoryName: string }; 
  'ProductDescriptionScreen': { productName: string }; // Add this line
};
