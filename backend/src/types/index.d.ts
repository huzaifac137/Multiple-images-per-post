export { };

declare global {
    namespace Express {
        interface Request {
            files: Express.Multer.File[]
        }
    }
}

declare global {
    interface Error {
        code: number;
        message: string;
    }
}