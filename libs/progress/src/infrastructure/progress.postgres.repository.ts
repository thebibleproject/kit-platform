import {UserProgressData, UserProgressRepository} from "../lib/progress";
import {Brackets, Column, DataSource, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class UserProgressRecord {
    @PrimaryColumn({type: "varchar", length: 36})
    userId: string;

    @PrimaryColumn({type: "varchar", length: 36})
    contentId: string;

    @Column({type: 'int'})
    progressPercentInt: number;

    @Column({type: 'bigint', nullable: true})
    completedTimestamp: string | null;

    @Column({type: 'boolean'})
    isBookmarked: boolean;
}

export class ProgressPostgresRepository implements UserProgressRepository {

    constructor(private readonly datasource: DataSource) {
    }

    async save(userProgressData: UserProgressData): Promise<void> {
        await this.datasource.getRepository(UserProgressRecord).save(dataToRecord(userProgressData));
    }

    /**
     * this ends up with a query something like this:
     * SELECT * FROM "user_progress_record" "userProgress"
     * WHERE ("userProgress"."userId" = id1.userId AND "userProgress"."contentId" = id1.contentId)
     * OR ("userProgress"."userId" = id2.userId AND "userProgress"."contentId" = id2.contentId)
     * OR ... rest of ids
     * @param ids
     */
    async loadByIds(ids: UserProgressData[]): Promise<UserProgressData[]> {
        return this.datasource
        .getRepository(UserProgressRecord)
            .createQueryBuilder("userProgress")
            .andWhere(new Brackets(qb => {
                ids.forEach((id, index) => {
                    qb.orWhere(`userProgress.userId = :userId${index} AND userProgress.contentId = :contentId${index}`, {
                        [`userId${index}`]: id.userId,
                        [`contentId${index}`]: id.contentId
                    })
                })
            }))
            .getMany()
            .then(records => records.map(recordToData))

    }
}

function dataToRecord(data: UserProgressData): UserProgressRecord {
    return {
        userId: data.userId,
        contentId: data.contentId,
        progressPercentInt: data.progressPercentInt,
        completedTimestamp:data.completedDate?.valueOf().toString() ?? null,
        isBookmarked: data.isBookmarked
    }
}

function recordToData(record: UserProgressRecord): UserProgressData {
    const completedDate = record.completedTimestamp ? new Date(parseInt(record.completedTimestamp)) : undefined;
    return new UserProgressData(
        record.userId,
        record.contentId,
        record.progressPercentInt,
        completedDate,
        record.isBookmarked
    )
}