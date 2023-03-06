/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const confirm_sign_up = /* GraphQL */ `
  mutation Confirm_sign_up($Email: String, $confirmation_code: String) {
    confirm_sign_up(Email: $Email, confirmation_code: $confirmation_code)
  }
`;
export const create_offer = /* GraphQL */ `
  mutation Create_offer {
    create_offer
  }
`;
export const create_shortlist = /* GraphQL */ `
  mutation Create_shortlist(
    $shortlist_name: String
    $list_type: ListType!
    $is_default: Boolean
  ) {
    create_shortlist(
      shortlist_name: $shortlist_name
      list_type: $list_type
      is_default: $is_default
    ) {
      shortlist_id
      shortlist_name
      owner_id
      shared_type
      list_type
      is_default
      shared_users
    }
  }
`;
export const create_row = /* GraphQL */ `
  mutation Create_row($shortlist_id: String) {
    create_row(shortlist_id: $shortlist_id)
  }
`;
export const update_offer = /* GraphQL */ `
  mutation Update_offer($offer_infos: [OfferInfos]) {
    update_offer(offer_infos: $offer_infos)
  }
`;
export const update_shortlist = /* GraphQL */ `
  mutation Update_shortlist($shortlist_id: String, $shortlist_name: String) {
    update_shortlist(
      shortlist_id: $shortlist_id
      shortlist_name: $shortlist_name
    ) {
      shortlist_id
      shortlist_name
      owner_id
      shared_type
      list_type
      is_default
      shared_users
    }
  }
`;
export const update_row = /* GraphQL */ `
  mutation Update_row(
    $shortlist_id: String
    $row_id: String
    $row_datas: [RowData]
  ) {
    update_row(
      shortlist_id: $shortlist_id
      row_id: $row_id
      row_datas: $row_datas
    )
  }
`;
export const url_shortener = /* GraphQL */ `
  mutation Url_shortener($url: String) {
    url_shortener(url: $url)
  }
`;
export const set_user_settings = /* GraphQL */ `
  mutation Set_user_settings($config: String) {
    set_user_settings(config: $config)
  }
`;
export const share_shortlist = /* GraphQL */ `
  mutation Share_shortlist($shortlist_id: String, $shared_users: [String]) {
    share_shortlist(shortlist_id: $shortlist_id, shared_users: $shared_users)
  }
`;
export const sign_up = /* GraphQL */ `
  mutation Sign_up($username: String, $Email: String, $password: String) {
    sign_up(username: $username, Email: $Email, password: $password)
  }
`;
export const stop_share_shortlist = /* GraphQL */ `
  mutation Stop_share_shortlist(
    $shortlist_id: String
    $stoped_shared_users: [String]
  ) {
    stop_share_shortlist(
      shortlist_id: $shortlist_id
      stoped_shared_users: $stoped_shared_users
    )
  }
`;
export const delete_shortlist = /* GraphQL */ `
  mutation Delete_shortlist($shortlist_id: String) {
    delete_shortlist(shortlist_id: $shortlist_id)
  }
`;
export const delete_row = /* GraphQL */ `
  mutation Delete_row($shortlist_id: String, $row_id: String) {
    delete_row(shortlist_id: $shortlist_id, row_id: $row_id)
  }
`;
