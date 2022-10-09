export interface BaseEntity {
    _id: string,
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}