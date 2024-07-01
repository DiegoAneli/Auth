import { MongoClient } from "mongodb";

declare global {
  namespace NodeJS {
    interface Global {
      _mongoClientPromise: Promise<MongoClient>;
    }
  }
}

// Per far sì che TypeScript tratti questo file come modulo
export {};
