import { Field, Model } from "../model/decorators";

/**
 * 模型基类
 */
export class BaseEntity {
  @Field({ label: "ID", editable: false, columnIndex: 0 })
  id: number;
  @Field({ label: "创建时间", editable: false, columnIndex: 999 })
  createTime: Date;
  @Field({ label: "修改时间", editable: false, columnIndex: 999 })
  updateTime: Date;
}

@Model({ module: "Jl", label: "会员微信" })
export class MemberWechat extends BaseEntity {
  @Field({ label: "用户ID" })
  memberId: string;
  @Field({ label: "微信 OpenID" })
  openId: string;
}

@Model({ module: "Jl", table: "jl_member", label: "会员" })
export class Member extends BaseEntity {
  @Field({ label: "昵称" })
  screenName: string;

  @Field({ label: "头像", componentType: "avatar" })
  avatarUrl: string;

  @Field({ label: "描述", fieldSpan: 24 })
  description: string;

  @Field({ label: "已初始化" })
  isInitialized: boolean;

  @Field({ label: "已封禁" })
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
