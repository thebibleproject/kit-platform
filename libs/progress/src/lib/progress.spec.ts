import {UserProgressData, UserProgressId, UserProgressRepository, UserProgressService} from "./progress";
import {before} from "@nrwl/js/src/utils/typescript/__mocks__/plugin-a";

class StubRepo implements UserProgressRepository {
    async save(userProgressData: UserProgressData): Promise<void> {
        throw new Error("Stub")
    }

    async loadByIds(ids: UserProgressId[]): Promise<UserProgressData[]> {
        throw new Error("Stub")
    }
}

describe('ProgressService', () => {
    let repo: UserProgressRepository;
    let service: UserProgressService;

    beforeEach(() => {
        repo = new StubRepo();
        service = new UserProgressService(repo);
    });

    describe("loadByIds", () => {
        test("should call repo.loadByIds with the given ids", async () => {
            const ids: UserProgressId[] = [
                {userId: "user1", contentId: "content1"},
                {userId: "user2", contentId: "content2"},
            ];
            const spy = jest.spyOn(repo, "loadByIds").mockResolvedValue([]);
            await service.loadByIds(ids);
            expect(spy).toHaveBeenCalledWith(ids);
        });
    });

    describe("save", () => {
        test("should call repo.save with the given data", async () => {
            const existingData = new UserProgressData("user1", "content1", 50, undefined, false);
            const updates = {progressPercentInt: 100, completedDate: new Date(), isBookmarked: false};
            const id: UserProgressId = {userId: "user1", contentId: "content1"};
            const findSpy = jest.spyOn(repo, "loadByIds").mockResolvedValue([existingData]);
            const saveSpy = jest.spyOn(repo, "save").mockResolvedValue();

            const expected = new UserProgressData("user1", "content1", 100, updates.completedDate, false);
            await service.save(id, updates);
            expect(findSpy).toHaveBeenCalledWith([id]);
            expect(saveSpy).toHaveBeenCalledWith(expected);

        });
    });

});
