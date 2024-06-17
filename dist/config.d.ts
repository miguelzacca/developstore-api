import nodemailer from "nodemailer";
declare const _default: {
    env: {
        NODE_ENV: string | undefined;
        PORT: number;
        SMTP_USER: string | undefined;
        AUTH_DURATION_DAYS: number;
        SECRET: string | undefined;
    };
    transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    cors: {
        origin: string;
        methods: string[];
        credentials: boolean;
    };
    cookie: {
        httpOnly: boolean;
        secure: boolean;
        maxAge: number;
        sameSite: string;
    };
    msg: {
        auth: {
            ok: string;
            incorrect: string;
            emailExists: string;
            noEmailToken: string;
            emailAlreadyVerified: string;
            noVerifiedEmail: string;
        };
        user: {
            notFound: string;
            created: string;
            deleted: string;
            updated: string;
        };
        server: {
            great: string;
            err: string;
            denied: string;
            invalidToken: string;
        };
    };
};
export default _default;
