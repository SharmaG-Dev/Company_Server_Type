import jwt from 'jsonwebtoken';
import { TokenResponse } from '../../../types/v1/token';
import { GetselfAdmin } from '../func/admin/authAdmin.func';
import { GetSingleUser } from '../func/user.func';

export const HandleToken = async (token: string): Promise<string | object> => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as Partial<TokenResponse>;
        const { id, role } = decoded;

        let _user;

        if (role === 'admin') {
            _user = await GetselfAdmin(id as string);
        } else {
            _user = await GetSingleUser(id as string);
        }

        if (!_user) {
            return 'user not found';
        }

        return _user;
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return error.message;
        }
        console.error(error);
        return 'Internal server error';
    }
};
