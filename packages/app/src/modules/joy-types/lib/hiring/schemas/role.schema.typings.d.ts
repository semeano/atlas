/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */
export declare type SchemaVersion = number;
export declare type Headline = string;
export declare type JobTitle = string;
export declare type JobDescriptionExpectsHTML = string;
export declare type QuestionFieldType = string;
export declare type QuestionsFields = QuestionField[];
export declare type QuestionSections = QuestionSection[];
export declare type TheRewardSchema = string;
export declare type HandleOrUsername = string;
export declare type TheItemsSchema = string;
export declare type AdditionalRolehiringProcessDetails = TheItemsSchema[];
export interface GenericJoyStreamRoleSchema {
    version: SchemaVersion;
    headline: Headline;
    job: JobSpecifics;
    application: ApplicationDetails;
    reward: TheRewardSchema;
    creator: CreatorDetails;
    process?: HiringProcess;
    [k: string]: any;
}
export interface JobSpecifics {
    title: JobTitle;
    description: JobDescriptionExpectsHTML;
    [k: string]: any;
}
export interface ApplicationDetails {
    sections?: QuestionSections;
    [k: string]: any;
}
export interface QuestionSection {
    title: any;
    questions: QuestionsFields;
    [k: string]: any;
}
export interface QuestionField {
    title: any;
    type: QuestionFieldType;
    [k: string]: any;
}
export interface CreatorDetails {
    membership: EntryInMembershipModuke;
    [k: string]: any;
}
export interface EntryInMembershipModuke {
    handle: HandleOrUsername;
    [k: string]: any;
}
export interface HiringProcess {
    details: AdditionalRolehiringProcessDetails;
    [k: string]: any;
}
