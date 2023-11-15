//Personally I like using classes for domain objects because its easier to add helper methods and keep things orgaanized
export class UserProgressData {
    constructor(
        public readonly userId: string,
        public readonly contentId: string,
        public readonly progressPercentInt: number,
        public readonly completedDate: Date | undefined,
        public readonly isBookmarked: boolean,
    ) {
    }

    public static empty(userId: string, contentId: string): UserProgressData {
        return new UserProgressData(userId, contentId, 0, undefined, false);
    }

    matches(id: UserProgressId): boolean {
        return this.userId === id.userId && this.contentId === id.contentId;
    }
}

export type UserProgressId = Pick<UserProgressData, 'userId' | "contentId">;

export type UserProgressDataUpdates = Partial<Omit<UserProgressData, "userId" | "contentId">>;

//utilizing interfaces allows for easier testing and mocking in tests
export interface UserProgressRepository {
    save(userProgressData: UserProgressData): Promise<void>;

    loadByIds(ids: UserProgressId[]): Promise<UserProgressData[]>;
}

export class UserProgressService {
    constructor(
        private readonly userProgressRepository: UserProgressRepository
    ) {
    }

    /**
     * allowing here for partial updates because it makes the front end easier
     * to work with and more in line with the "only specify what you want" philosophy of graphql
     *
     * @param id
     * @param updates
     */
    async save(id: UserProgressId, updates: UserProgressDataUpdates): Promise<UserProgressData> {
        const existing = await this.loadByIds([id]);
        const firstOrEmpty = existing.length > 0 ? existing[0] : UserProgressData.empty(id.userId, id.contentId);
        const merged = new UserProgressData(
            firstOrEmpty.userId,
            firstOrEmpty.contentId,
            updates.progressPercentInt ?? firstOrEmpty.progressPercentInt,
            updates.completedDate ?? firstOrEmpty.completedDate,
            updates.isBookmarked ?? firstOrEmpty.isBookmarked,
        );
        await this.userProgressRepository.save(merged);
        return merged;
    }

    async loadByIds(ids: UserProgressId[]): Promise<UserProgressData[]> {
        return await this.userProgressRepository.loadByIds(ids);
    }


}

