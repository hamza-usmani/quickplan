export class UserProfilePlans {
    planid: number;
    userid: string;
    planname: string;
    createdAt: string;
    updatedAt: string;
}

export class UserProfile {
    email: string;
    plans: UserProfilePlans[];
}
