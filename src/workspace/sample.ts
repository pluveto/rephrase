import { BaseEntity, Field, Table } from "../model";

/**
 * 描述
 */
@Table({ name: "jl_member" })
export class JlMember extends BaseEntity {
  @Field({ display: "昵称" })
  screenName: string;

  @Field({ display: "头像链接" })
  avatarUrl: string;

  @Field({ display: "描述" })
  description: string;

  @Field({ display: "是否已初始化" })
  isInitialized: boolean;
  
  @Field({ display: "是否已封禁" })
  isBlocked: boolean;

  @Field({ display: "微信" })
  openId: string;
}
