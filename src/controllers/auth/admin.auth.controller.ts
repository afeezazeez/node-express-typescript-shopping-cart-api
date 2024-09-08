import { Request, Response, NextFunction } from 'express';
import { sendSuccessResponse } from "../../utils/http-response/response-handlers";
import { AuthService } from "../../services/auth.service";

import { LoginRequestDto } from "../../dtos/auth/login.request.dto";
import { RequestPasswordLinkDto } from "../../dtos/auth/request-password-request.dto";
import { ResetPasswordRequestDto } from "../../dtos/auth/reset-password-request.dto";
import { IRequestWithUser } from "../../interfaces/request/request-user";

export class AdminAuthController {

    private readonly authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }


    /**
     * @swagger
     * /api/admins/auth/login:
     *   post:
     *     summary: Login a user
     *     tags: [Admin Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginRequestDto'
     *     responses:
     *       200:
     *         description: Login successful
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SuccessResponse'
     *       400:
     *         description: Bad request - Either password is incorrect or email is not associated with any account
     *         content:
     *           application/json:
     *             schema:
     *                oneOf:
     *                  - $ref: '#/components/schemas/PasswordIncorrectErrorResponse'
     *                  - $ref: '#/components/schemas/EmailIncorrectErrorResponse'
     *
     */
    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await this.authService.login(req.body as LoginRequestDto);
            return sendSuccessResponse(res, response, 'Login successful.');
        } catch (e) {
            next(e);
        }
    };

    /**
     * @swagger
     * /api/admins/auth/admin:
     *   get:
     *     summary: Get the authenticated admin
     *     tags: [Admin Auth]
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Authenticated user details
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SuccessResponse'
     */
    getAuthUser = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
        try {
            const response = await this.authService.getAuthUser(req);
            return sendSuccessResponse(res, response);
        } catch (e) {
            next(e);
        }
    };

    /**
     * @swagger
     * /api/admins/auth/logout:
     *   post:
     *     summary: Logout the authenticated user
     *     tags: [Admin Auth]
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Logout successful
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SuccessResponse'
     */
    logout = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
            const response = await this.authService.logout(token);
            return sendSuccessResponse(res, response, 'Logout successful.');
        } catch (e) {
            next(e);
        }
    };


    /**
     * @swagger
     * /api/admins/auth/password/request-reset:
     *   post:
     *     summary: Request password reset link
     *     tags: [Admin Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/RequestPasswordLinkDto'
     *     responses:
     *       200:
     *         description: Password reset link sent
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SuccessResponse'
     */
    requestPasswordResetLink = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.authService.requestPasswordResetLink(req.body as RequestPasswordLinkDto);
            return sendSuccessResponse(res, null, 'Password reset link sent successfully.');
        } catch (e) {
            next(e);
        }
    };

    /**
     * @swagger
     * /api/admins/auth/password/reset:
     *   post:
     *     summary: Reset password
     *     tags: [Admin Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ResetPasswordRequestDto'
     *     responses:
     *       200:
     *         description: Password reset successful
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/SuccessResponse'
     */
    resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.authService.resetPassword(req.body as ResetPasswordRequestDto);
            return sendSuccessResponse(res, null, 'Password was reset successfully.');
        } catch (e) {
            next(e);
        }
    };
}
