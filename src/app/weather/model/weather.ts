export interface Weather {
  id: number;
  city: string;
  dt: number; // timestamp
  main: {
    temp: number;
  };
}
