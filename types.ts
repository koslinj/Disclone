import { Member, Profile, Server } from "@prisma/client/edge";

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & {profile: Profile})[];
}