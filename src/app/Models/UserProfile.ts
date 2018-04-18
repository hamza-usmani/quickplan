export class UserProfile {
    email: string;
    plans: {
            planid: number,
            userid: string,
            planname: string,
            createdAt: string,
            updatedAt: string
            }[];
}
