
//Personally I like using classes for domain objects because its easier to add helper methods and keep things orgaanized
export class UserProgressData {
    constructor(
        public readonly userId: string,
        public readonly contentId: string,
        public readonly progressPercentInt: number,
        public readonly isComplete: boolean,
        public readonly isBookmarked: boolean,
    ) {
    }

    public static empty(userId: string, contentId: string): UserProgressData {
        return new UserProgressData(userId, contentId, 0, false, false);
    }

    matches(id: UserProgressId): boolean {
        return this.userId === id.userId && this.contentId === id.contentId;
    }
}

export type UserProgressId = Pick<UserProgressData, 'userId' | "contentId">;

export interface UserProgressRepository {
    save(userProgressData: UserProgressData): Promise<void>;

    loadByIds(ids: UserProgressId[]): Promise<UserProgressData[]>;
}

export class UserProgressRepositoryStub implements UserProgressRepository {

    //todo
    async save(userProgressData: UserProgressData): Promise<void> {
        // do nothing
    }

    //todo
    async loadByIds(ids: UserProgressData[]): Promise<UserProgressData[]> {
        return ids.map(id => UserProgressData.empty(id.userId, id.contentId));
    }
}

export class UserProgressService {
    constructor(
        private readonly userProgressRepository: UserProgressRepository
    ) {
    }

    async save(userProgressData: UserProgressData): Promise<void> {
        await this.userProgressRepository.save(userProgressData);
    }

    async loadByIds(ids: UserProgressId[]): Promise<UserProgressData[]> {
        return await this.userProgressRepository.loadByIds(ids);
    }


}

