import { Field, Table as Model } from "../model/decorators";


/**
 * 模型基类
 */
export class BaseEntity {
  @Field({ label: "ID", editable: false, columnIndex:0 })
  id: number;
  @Field({ label: "创建时间", editable: false, columnIndex:999 })
  createTime: Date;
  @Field({ label: "修改时间", editable: false, columnIndex:999 })
  updateTime: Date;
}




@Model({ table: "jl_member_wechat", display: "会员微信" })
export class JlMemberWechat extends BaseEntity {
  @Field({ label: "用户ID" })
  memberId: string;
  @Field({ label: "微信 OpenID" })
  openId: string;
}

/**
 * 描述
 */
@Model({ table: "jl_member", display: "会员" })
export class JlMember extends BaseEntity {
  @Field({ label: "昵称" })
  screenName: string;

  @Field({ label: "头像" , componentType: "avatar"})
  avatarUrl: string;

  @Field({ label: "描述" })
  description: string;

  @Field({ label: "是否已初始化" })
  isInitialized: boolean;

  @Field({ label: "是否已封禁" })
  isBlocked: boolean;

  @Field({
    label: "微信",
    join: {
      target: "JlMemberWechat",
      field: "openId",
      condition: ["id", "memberId"],
    },
  })
  openId: string;
}
