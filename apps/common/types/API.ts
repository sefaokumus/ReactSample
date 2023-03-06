/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export enum ListType {
  Clubneed = "Clubneed",
  Shortlist = "Shortlist",
}


export type ShortlistInfo = {
  __typename: "ShortlistInfo",
  shortlist_id?: string | null,
  shortlist_name?: string | null,
  owner_id?: string | null,
  shared_type?: string | null,
  list_type: ListType,
  is_default?: boolean | null,
  shared_users?: Array< string | null > | null,
};

export type OfferInfos = {
  offer_id?: string | null,
  team?: OfferedTeamDatas | null,
  player?: OfferedPlayerDatas | null,
  transfer_season?: string | null,
  note?: string | null,
};

export type OfferedTeamDatas = {
  name?: string | null,
  logo?: string | null,
  team_id?: string | null,
};

export type OfferedPlayerDatas = {
  name?: string | null,
  logo?: string | null,
  player_id?: string | null,
};

export type RowData = {
  column?: string | null,
  value?: string | null,
};

export type Country = {
  __typename: "Country",
  name?: string | null,
  id?: string | null,
  category_id?: string | null,
  logo?: string | null,
  updated_at?: string | null,
  category_name?: string | null,
};

export type League = {
  __typename: "League",
  id?: string | null,
  category_id?: string | null,
  country_id?: string | null,
  name?: string | null,
  short_name?: string | null,
  logo?: string | null,
  type?: number | null,
  cur_seasons_id?: string | null,
  cur_stage_id?: string | null,
  cur_round?: number | null,
  round_count?: number | null,
  primary_color?: string | null,
  secondary_color?: string | null,
  updated_at?: string | null,
  category_name?: string | null,
  country_name?: string | null,
};

export type Player = {
  __typename: "Player",
  id?: string | null,
  team_id?: string | null,
  name?: string | null,
  short_name?: string | null,
  logo?: string | null,
  national_logo?: string | null,
  birthday?: number | null,
  age?: number | null,
  weight?: number | null,
  height?: number | null,
  country_id?: string | null,
  nationality?: string | null,
  market_value?: number | null,
  market_value_currency?: string | null,
  contract_until?: number | null,
  preferred_foot?: number | null,
  ability?: string | null,
  characteristics?: string | null,
  updated_at?: number | null,
  team_name?: string | null,
  team_logo?: string | null,
  league_id?: string | null,
  league_name?: string | null,
  country_name?: string | null,
  position?: string | null,
  positions?: string | null,
  country_logo?: string | null,
  league_logo?: string | null,
  offer_history?:  Array<OfferHistory | null > | null,
};

export type OfferHistory = {
  __typename: "OfferHistory",
  offerDate?: string | null,
  offer_id?: string | null,
  team?: OfferedTeamData | null,
  player?: OfferedPlayerData | null,
  transfer_season?: string | null,
  note?: string | null,
};

export type OfferedTeamData = {
  __typename: "OfferedTeamData",
  name?: string | null,
  team_id?: string | null,
  logo?: string | null,
};

export type OfferedPlayerData = {
  __typename: "OfferedPlayerData",
  name?: string | null,
  player_id?: string | null,
  logo?: string | null,
};

export type PlayerMatchStat = {
  __typename: "PlayerMatchStat",
  key_passes?: number | null,
  saves?: number | null,
  crosses_accuracy?: number | null,
  runs_out_succ?: number | null,
  punches?: number | null,
  freekick_goals?: number | null,
  clearances?: number | null,
  passes_accuracy?: number | null,
  crosses?: number | null,
  minutes_played?: number | null,
  goals?: number | null,
  long_balls?: number | null,
  first?: number | null,
  blocked_shots?: number | null,
  passes?: number | null,
  red_cards?: number | null,
  yellow2red_cards?: number | null,
  penalty?: number | null,
  offsides?: number | null,
  tackles?: number | null,
  duels_won?: number | null,
  dribble_succ?: number | null,
  good_high_claim?: number | null,
  hit_woodwork?: number | null,
  runs_out?: number | null,
  shots?: number | null,
  rating?: number | null,
  fastbreak_goals?: number | null,
  assists?: number | null,
  dispossessed?: number | null,
  yellow_cards?: number | null,
  interceptions?: number | null,
  long_balls_accuracy?: number | null,
  fastbreak_shots?: number | null,
  shots_on_target?: number | null,
  fastbreaks?: number | null,
  fouls?: number | null,
  duels?: number | null,
  freekicks?: number | null,
  was_fouled?: number | null,
  poss_losts?: number | null,
  dribble?: number | null,
  team_id?: string | null,
  team_name?: string | null,
  team_short_name?: string | null,
  team_logo?: string | null,
  team_country_logo?: string | null,
  player_id?: string | null,
  player_name?: string | null,
  player_short_name?: string | null,
  player_logo?: string | null,
  player_national_logo?: string | null,
  player_age?: number | null,
  player_birthday?: number | null,
  player_weight?: number | null,
  player_height?: number | null,
  player_country_id?: string | null,
  player_country_name?: string | null,
  player_country_logo?: string | null,
  player_nationality?: string | null,
  player_market_value?: number | null,
  player_market_value_currency?: string | null,
  player_contract_until?: number | null,
  player_preferred_foot?: number | null,
  player_ability?: string | null,
  player_characteristics?: string | null,
  player_position?: string | null,
  player_positions?: string | null,
  match_id?: string | null,
  match_season_id?: string | null,
  match_home_team_id?: string | null,
  match_away_team_id?: string | null,
  match_league_id?: string | null,
  match_league_name?: string | null,
  match_league_logo?: string | null,
  match_league_short_name?: string | null,
  match_league_primary_color?: string | null,
  match_league_secondary_color?: string | null,
  match_league_round_count?: number | null,
  season_year?: number | null,
  season_start_time?: number | null,
  season_end_time?: number | null,
  match_home_team_name?: string | null,
  match_home_team_short_name?: string | null,
  match_home_team_logo?: string | null,
  match_home_team_country_id?: string | null,
  match_home_team_country_name?: string | null,
  match_home_team_country_logo?: string | null,
  match_away_team_name?: string | null,
  match_away_team_short_name?: string | null,
  match_away_team_logo?: string | null,
  match_away_team_country_id?: string | null,
  match_away_team_country_name?: string | null,
  match_away_team_country_logo?: string | null,
};

export type PlayerSeasonStat = {
  __typename: "PlayerSeasonStat",
  key_passes?: number | null,
  saves?: number | null,
  crosses_accuracy?: number | null,
  runs_out_succ?: number | null,
  player_name?: string | null,
  player_logo?: string | null,
  player_id?: string | null,
  player_position?: string | null,
  player_nationality?: string | null,
  player_country_id?: string | null,
  crosses?: number | null,
  minutes_played?: number | null,
  long_balls?: number | null,
  red_cards?: number | null,
  yellow2red_cards?: number | null,
  team_name?: string | null,
  team_logo?: string | null,
  team_id?: string | null,
  tackles?: number | null,
  hit_woodwork?: number | null,
  runs_out?: number | null,
  rating?: number | null,
  fastbreak_goals?: number | null,
  fastbreak_shots?: number | null,
  yellow_cards?: number | null,
  long_balls_accuracy?: number | null,
  shots_on_target?: number | null,
  updated_at?: number | null,
  season_id?: string | null,
  fastbreaks?: number | null,
  freekicks?: number | null,
  punches?: number | null,
  freekick_goals?: number | null,
  clearances?: number | null,
  passes_accuracy?: number | null,
  goals?: number | null,
  first?: number | null,
  blocked_shots?: number | null,
  passes?: number | null,
  offsides?: number | null,
  penalty?: number | null,
  duels_won?: number | null,
  dribble_succ?: number | null,
  good_high_claim?: number | null,
  shots?: number | null,
  assists?: number | null,
  dispossessed?: number | null,
  matches?: number | null,
  interceptions?: number | null,
  fouls?: number | null,
  court?: number | null,
  duels?: number | null,
  poss_losts?: number | null,
  was_fouled?: number | null,
  dribble?: number | null,
  season_year?: string | null,
  season_start_time?: number | null,
  season_end_time?: number | null,
  season_league_id?: string | null,
  season_league_name?: string | null,
  season_league_logo?: string | null,
  season_league_short_name?: string | null,
  season_league_primary_color?: string | null,
  season_league_secondary_color?: string | null,
  season_league_round_count?: string | null,
  player_short_name?: string | null,
  player_national_logo?: string | null,
  player_age?: number | null,
  player_birthday?: number | null,
  player_weight?: number | null,
  player_height?: number | null,
  player_market_value?: number | null,
  player_market_value_currency?: string | null,
  player_contract_until?: number | null,
  player_preferred_foot?: number | null,
  player_ability?: string | null,
  player_characteristics?: string | null,
  player_positions?: string | null,
  player_team_id?: string | null,
  player_country_name?: string | null,
  player_country_logo?: string | null,
  team_short_name?: string | null,
  team_country_id?: string | null,
  team_country_name?: string | null,
  team_country_logo?: string | null,
  team_league_id?: string | null,
  team_league_name?: string | null,
  team_league_logo?: string | null,
  team_league_short_name?: string | null,
};

export type Team = {
  __typename: "Team",
  market_value?: number | null,
  website?: string | null,
  national?: number | null,
  logo?: string | null,
  total_players?: number | null,
  name?: string | null,
  updated_at?: number | null,
  venue_id?: string | null,
  coach_id?: string | null,
  short_name?: string | null,
  foundation_time?: number | null,
  country_id?: string | null,
  foreign_players?: number | null,
  country_logo?: string | null,
  market_value_currency?: string | null,
  national_players?: number | null,
  id?: string | null,
  country_name?: string | null,
  league_id?: string | null,
  league_name?: string | null,
  league_logo?: string | null,
  coach_name?: string | null,
  coach_logo?: string | null,
  offer_history?:  Array<OfferHistory | null > | null,
};

export type MergedData = {
  __typename: "MergedData",
  players?:  Array<PlayerSeasonStat | null > | null,
  teams?:  Array<Team | null > | null,
  leagues?:  Array<League | null > | null,
  countries?:  Array<Country | null > | null,
};

export type Confirm_sign_upMutationVariables = {
  Email?: string | null,
  confirmation_code?: string | null,
};

export type Confirm_sign_upMutation = {
  confirm_sign_up?: boolean | null,
};

export type Create_offerMutation = {
  create_offer?: string | null,
};

export type Create_shortlistMutationVariables = {
  shortlist_name?: string | null,
  list_type: ListType,
  is_default?: boolean | null,
};

export type Create_shortlistMutation = {
  create_shortlist?:  {
    __typename: "ShortlistInfo",
    shortlist_id?: string | null,
    shortlist_name?: string | null,
    owner_id?: string | null,
    shared_type?: string | null,
    list_type: ListType,
    is_default?: boolean | null,
    shared_users?: Array< string | null > | null,
  } | null,
};

export type Create_rowMutationVariables = {
  shortlist_id?: string | null,
};

export type Create_rowMutation = {
  create_row?: string | null,
};

export type Update_offerMutationVariables = {
  offer_infos?: Array< OfferInfos | null > | null,
};

export type Update_offerMutation = {
  update_offer?: string | null,
};

export type Update_shortlistMutationVariables = {
  shortlist_id?: string | null,
  shortlist_name?: string | null,
};

export type Update_shortlistMutation = {
  update_shortlist?:  {
    __typename: "ShortlistInfo",
    shortlist_id?: string | null,
    shortlist_name?: string | null,
    owner_id?: string | null,
    shared_type?: string | null,
    list_type: ListType,
    is_default?: boolean | null,
    shared_users?: Array< string | null > | null,
  } | null,
};

export type Update_rowMutationVariables = {
  shortlist_id?: string | null,
  row_id?: string | null,
  row_datas?: Array< RowData | null > | null,
};

export type Update_rowMutation = {
  update_row?: boolean | null,
};

export type Url_shortenerMutationVariables = {
  url?: string | null,
};

export type Url_shortenerMutation = {
  url_shortener?: string | null,
};

export type Set_user_settingsMutationVariables = {
  config?: string | null,
};

export type Set_user_settingsMutation = {
  set_user_settings?: string | null,
};

export type Share_shortlistMutationVariables = {
  shortlist_id?: string | null,
  shared_users?: Array< string | null > | null,
};

export type Share_shortlistMutation = {
  share_shortlist?: boolean | null,
};

export type Sign_upMutationVariables = {
  username?: string | null,
  Email?: string | null,
  password?: string | null,
};

export type Sign_upMutation = {
  sign_up?: boolean | null,
};

export type Stop_share_shortlistMutationVariables = {
  shortlist_id?: string | null,
  stoped_shared_users?: Array< string | null > | null,
};

export type Stop_share_shortlistMutation = {
  stop_share_shortlist?: boolean | null,
};

export type Delete_shortlistMutationVariables = {
  shortlist_id?: string | null,
};

export type Delete_shortlistMutation = {
  delete_shortlist?: string | null,
};

export type Delete_rowMutationVariables = {
  shortlist_id?: string | null,
  row_id?: string | null,
};

export type Delete_rowMutation = {
  delete_row?: boolean | null,
};

export type SqlQueryVariables = {
  query?: string | null,
};

export type SqlQuery = {
  sql?: string | null,
};

export type Get_countriesQuery = {
  get_countries?:  Array< {
    __typename: "Country",
    name?: string | null,
    id?: string | null,
    category_id?: string | null,
    logo?: string | null,
    updated_at?: string | null,
    category_name?: string | null,
  } | null > | null,
};

export type Get_countryQueryVariables = {
  country_id?: string | null,
};

export type Get_countryQuery = {
  get_country?:  {
    __typename: "Country",
    name?: string | null,
    id?: string | null,
    category_id?: string | null,
    logo?: string | null,
    updated_at?: string | null,
    category_name?: string | null,
  } | null,
};

export type Get_my_shortlistsQuery = {
  get_my_shortlists?:  Array< {
    __typename: "ShortlistInfo",
    shortlist_id?: string | null,
    shortlist_name?: string | null,
    owner_id?: string | null,
    shared_type?: string | null,
    list_type: ListType,
    is_default?: boolean | null,
    shared_users?: Array< string | null > | null,
  } | null > | null,
};

export type Get_leaguesQueryVariables = {
  league_id?: string | null,
};

export type Get_leaguesQuery = {
  get_leagues?:  Array< {
    __typename: "League",
    id?: string | null,
    category_id?: string | null,
    country_id?: string | null,
    name?: string | null,
    short_name?: string | null,
    logo?: string | null,
    type?: number | null,
    cur_seasons_id?: string | null,
    cur_stage_id?: string | null,
    cur_round?: number | null,
    round_count?: number | null,
    primary_color?: string | null,
    secondary_color?: string | null,
    updated_at?: string | null,
    category_name?: string | null,
    country_name?: string | null,
  } | null > | null,
};

export type Get_leagueQueryVariables = {
  league_id?: string | null,
};

export type Get_leagueQuery = {
  get_league?:  {
    __typename: "League",
    id?: string | null,
    category_id?: string | null,
    country_id?: string | null,
    name?: string | null,
    short_name?: string | null,
    logo?: string | null,
    type?: number | null,
    cur_seasons_id?: string | null,
    cur_stage_id?: string | null,
    cur_round?: number | null,
    round_count?: number | null,
    primary_color?: string | null,
    secondary_color?: string | null,
    updated_at?: string | null,
    category_name?: string | null,
    country_name?: string | null,
  } | null,
};

export type Get_playersQueryVariables = {
  team_id?: string | null,
};

export type Get_playersQuery = {
  get_players?:  Array< {
    __typename: "Player",
    id?: string | null,
    team_id?: string | null,
    name?: string | null,
    short_name?: string | null,
    logo?: string | null,
    national_logo?: string | null,
    birthday?: number | null,
    age?: number | null,
    weight?: number | null,
    height?: number | null,
    country_id?: string | null,
    nationality?: string | null,
    market_value?: number | null,
    market_value_currency?: string | null,
    contract_until?: number | null,
    preferred_foot?: number | null,
    ability?: string | null,
    characteristics?: string | null,
    updated_at?: number | null,
    team_name?: string | null,
    team_logo?: string | null,
    league_id?: string | null,
    league_name?: string | null,
    country_name?: string | null,
    position?: string | null,
    positions?: string | null,
    country_logo?: string | null,
    league_logo?: string | null,
    offer_history?:  Array< {
      __typename: "OfferHistory",
      offerDate?: string | null,
      offer_id?: string | null,
      transfer_season?: string | null,
      note?: string | null,
    } | null > | null,
  } | null > | null,
};

export type Get_playerQueryVariables = {
  player_id?: string | null,
};

export type Get_playerQuery = {
  get_player?:  {
    __typename: "Player",
    id?: string | null,
    team_id?: string | null,
    name?: string | null,
    short_name?: string | null,
    logo?: string | null,
    national_logo?: string | null,
    birthday?: number | null,
    age?: number | null,
    weight?: number | null,
    height?: number | null,
    country_id?: string | null,
    nationality?: string | null,
    market_value?: number | null,
    market_value_currency?: string | null,
    contract_until?: number | null,
    preferred_foot?: number | null,
    ability?: string | null,
    characteristics?: string | null,
    updated_at?: number | null,
    team_name?: string | null,
    team_logo?: string | null,
    league_id?: string | null,
    league_name?: string | null,
    country_name?: string | null,
    position?: string | null,
    positions?: string | null,
    country_logo?: string | null,
    league_logo?: string | null,
    offer_history?:  Array< {
      __typename: "OfferHistory",
      offerDate?: string | null,
      offer_id?: string | null,
      transfer_season?: string | null,
      note?: string | null,
    } | null > | null,
  } | null,
};

export type Get_player_match_statQueryVariables = {
  player_id?: string | null,
};

export type Get_player_match_statQuery = {
  get_player_match_stat?:  Array< {
    __typename: "PlayerMatchStat",
    key_passes?: number | null,
    saves?: number | null,
    crosses_accuracy?: number | null,
    runs_out_succ?: number | null,
    punches?: number | null,
    freekick_goals?: number | null,
    clearances?: number | null,
    passes_accuracy?: number | null,
    crosses?: number | null,
    minutes_played?: number | null,
    goals?: number | null,
    long_balls?: number | null,
    first?: number | null,
    blocked_shots?: number | null,
    passes?: number | null,
    red_cards?: number | null,
    yellow2red_cards?: number | null,
    penalty?: number | null,
    offsides?: number | null,
    tackles?: number | null,
    duels_won?: number | null,
    dribble_succ?: number | null,
    good_high_claim?: number | null,
    hit_woodwork?: number | null,
    runs_out?: number | null,
    shots?: number | null,
    rating?: number | null,
    fastbreak_goals?: number | null,
    assists?: number | null,
    dispossessed?: number | null,
    yellow_cards?: number | null,
    interceptions?: number | null,
    long_balls_accuracy?: number | null,
    fastbreak_shots?: number | null,
    shots_on_target?: number | null,
    fastbreaks?: number | null,
    fouls?: number | null,
    duels?: number | null,
    freekicks?: number | null,
    was_fouled?: number | null,
    poss_losts?: number | null,
    dribble?: number | null,
    team_id?: string | null,
    team_name?: string | null,
    team_short_name?: string | null,
    team_logo?: string | null,
    team_country_logo?: string | null,
    player_id?: string | null,
    player_name?: string | null,
    player_short_name?: string | null,
    player_logo?: string | null,
    player_national_logo?: string | null,
    player_age?: number | null,
    player_birthday?: number | null,
    player_weight?: number | null,
    player_height?: number | null,
    player_country_id?: string | null,
    player_country_name?: string | null,
    player_country_logo?: string | null,
    player_nationality?: string | null,
    player_market_value?: number | null,
    player_market_value_currency?: string | null,
    player_contract_until?: number | null,
    player_preferred_foot?: number | null,
    player_ability?: string | null,
    player_characteristics?: string | null,
    player_position?: string | null,
    player_positions?: string | null,
    match_id?: string | null,
    match_season_id?: string | null,
    match_home_team_id?: string | null,
    match_away_team_id?: string | null,
    match_league_id?: string | null,
    match_league_name?: string | null,
    match_league_logo?: string | null,
    match_league_short_name?: string | null,
    match_league_primary_color?: string | null,
    match_league_secondary_color?: string | null,
    match_league_round_count?: number | null,
    season_year?: number | null,
    season_start_time?: number | null,
    season_end_time?: number | null,
    match_home_team_name?: string | null,
    match_home_team_short_name?: string | null,
    match_home_team_logo?: string | null,
    match_home_team_country_id?: string | null,
    match_home_team_country_name?: string | null,
    match_home_team_country_logo?: string | null,
    match_away_team_name?: string | null,
    match_away_team_short_name?: string | null,
    match_away_team_logo?: string | null,
    match_away_team_country_id?: string | null,
    match_away_team_country_name?: string | null,
    match_away_team_country_logo?: string | null,
  } | null > | null,
};

export type Get_player_season_statQueryVariables = {
  player_id?: string | null,
};

export type Get_player_season_statQuery = {
  get_player_season_stat?:  Array< {
    __typename: "PlayerSeasonStat",
    key_passes?: number | null,
    saves?: number | null,
    crosses_accuracy?: number | null,
    runs_out_succ?: number | null,
    player_name?: string | null,
    player_logo?: string | null,
    player_id?: string | null,
    player_position?: string | null,
    player_nationality?: string | null,
    player_country_id?: string | null,
    crosses?: number | null,
    minutes_played?: number | null,
    long_balls?: number | null,
    red_cards?: number | null,
    yellow2red_cards?: number | null,
    team_name?: string | null,
    team_logo?: string | null,
    team_id?: string | null,
    tackles?: number | null,
    hit_woodwork?: number | null,
    runs_out?: number | null,
    rating?: number | null,
    fastbreak_goals?: number | null,
    fastbreak_shots?: number | null,
    yellow_cards?: number | null,
    long_balls_accuracy?: number | null,
    shots_on_target?: number | null,
    updated_at?: number | null,
    season_id?: string | null,
    fastbreaks?: number | null,
    freekicks?: number | null,
    punches?: number | null,
    freekick_goals?: number | null,
    clearances?: number | null,
    passes_accuracy?: number | null,
    goals?: number | null,
    first?: number | null,
    blocked_shots?: number | null,
    passes?: number | null,
    offsides?: number | null,
    penalty?: number | null,
    duels_won?: number | null,
    dribble_succ?: number | null,
    good_high_claim?: number | null,
    shots?: number | null,
    assists?: number | null,
    dispossessed?: number | null,
    matches?: number | null,
    interceptions?: number | null,
    fouls?: number | null,
    court?: number | null,
    duels?: number | null,
    poss_losts?: number | null,
    was_fouled?: number | null,
    dribble?: number | null,
    season_year?: string | null,
    season_start_time?: number | null,
    season_end_time?: number | null,
    season_league_id?: string | null,
    season_league_name?: string | null,
    season_league_logo?: string | null,
    season_league_short_name?: string | null,
    season_league_primary_color?: string | null,
    season_league_secondary_color?: string | null,
    season_league_round_count?: string | null,
    player_short_name?: string | null,
    player_national_logo?: string | null,
    player_age?: number | null,
    player_birthday?: number | null,
    player_weight?: number | null,
    player_height?: number | null,
    player_market_value?: number | null,
    player_market_value_currency?: string | null,
    player_contract_until?: number | null,
    player_preferred_foot?: number | null,
    player_ability?: string | null,
    player_characteristics?: string | null,
    player_positions?: string | null,
    player_team_id?: string | null,
    player_country_name?: string | null,
    player_country_logo?: string | null,
    team_short_name?: string | null,
    team_country_id?: string | null,
    team_country_name?: string | null,
    team_country_logo?: string | null,
    team_league_id?: string | null,
    team_league_name?: string | null,
    team_league_logo?: string | null,
    team_league_short_name?: string | null,
  } | null > | null,
};

export type Get_rowsQueryVariables = {
  shortlist_id?: string | null,
  row_id?: string | null,
  columns?: Array< string | null > | null,
};

export type Get_rowsQuery = {
  get_rows?: Array< string | null > | null,
};

export type Get_urlQueryVariables = {
  key?: string | null,
};

export type Get_urlQuery = {
  get_url?: string | null,
};

export type Get_teamsQueryVariables = {
  league_id: string,
};

export type Get_teamsQuery = {
  get_teams?:  Array< {
    __typename: "Team",
    market_value?: number | null,
    website?: string | null,
    national?: number | null,
    logo?: string | null,
    total_players?: number | null,
    name?: string | null,
    updated_at?: number | null,
    venue_id?: string | null,
    coach_id?: string | null,
    short_name?: string | null,
    foundation_time?: number | null,
    country_id?: string | null,
    foreign_players?: number | null,
    country_logo?: string | null,
    market_value_currency?: string | null,
    national_players?: number | null,
    id?: string | null,
    country_name?: string | null,
    league_id?: string | null,
    league_name?: string | null,
    league_logo?: string | null,
    coach_name?: string | null,
    coach_logo?: string | null,
    offer_history?:  Array< {
      __typename: "OfferHistory",
      offerDate?: string | null,
      offer_id?: string | null,
      transfer_season?: string | null,
      note?: string | null,
    } | null > | null,
  } | null > | null,
};

export type Get_teamQueryVariables = {
  team_id?: string | null,
};

export type Get_teamQuery = {
  get_team?:  {
    __typename: "Team",
    market_value?: number | null,
    website?: string | null,
    national?: number | null,
    logo?: string | null,
    total_players?: number | null,
    name?: string | null,
    updated_at?: number | null,
    venue_id?: string | null,
    coach_id?: string | null,
    short_name?: string | null,
    foundation_time?: number | null,
    country_id?: string | null,
    foreign_players?: number | null,
    country_logo?: string | null,
    market_value_currency?: string | null,
    national_players?: number | null,
    id?: string | null,
    country_name?: string | null,
    league_id?: string | null,
    league_name?: string | null,
    league_logo?: string | null,
    coach_name?: string | null,
    coach_logo?: string | null,
    offer_history?:  Array< {
      __typename: "OfferHistory",
      offerDate?: string | null,
      offer_id?: string | null,
      transfer_season?: string | null,
      note?: string | null,
    } | null > | null,
  } | null,
};

export type Get_user_settingQuery = {
  get_user_setting?: string | null,
};

export type SearchQueryVariables = {
  term?: string | null,
};

export type SearchQuery = {
  search?:  {
    __typename: "MergedData",
    players?:  Array< {
      __typename: "PlayerSeasonStat",
      key_passes?: number | null,
      saves?: number | null,
      crosses_accuracy?: number | null,
      runs_out_succ?: number | null,
      player_name?: string | null,
      player_logo?: string | null,
      player_id?: string | null,
      player_position?: string | null,
      player_nationality?: string | null,
      player_country_id?: string | null,
      crosses?: number | null,
      minutes_played?: number | null,
      long_balls?: number | null,
      red_cards?: number | null,
      yellow2red_cards?: number | null,
      team_name?: string | null,
      team_logo?: string | null,
      team_id?: string | null,
      tackles?: number | null,
      hit_woodwork?: number | null,
      runs_out?: number | null,
      rating?: number | null,
      fastbreak_goals?: number | null,
      fastbreak_shots?: number | null,
      yellow_cards?: number | null,
      long_balls_accuracy?: number | null,
      shots_on_target?: number | null,
      updated_at?: number | null,
      season_id?: string | null,
      fastbreaks?: number | null,
      freekicks?: number | null,
      punches?: number | null,
      freekick_goals?: number | null,
      clearances?: number | null,
      passes_accuracy?: number | null,
      goals?: number | null,
      first?: number | null,
      blocked_shots?: number | null,
      passes?: number | null,
      offsides?: number | null,
      penalty?: number | null,
      duels_won?: number | null,
      dribble_succ?: number | null,
      good_high_claim?: number | null,
      shots?: number | null,
      assists?: number | null,
      dispossessed?: number | null,
      matches?: number | null,
      interceptions?: number | null,
      fouls?: number | null,
      court?: number | null,
      duels?: number | null,
      poss_losts?: number | null,
      was_fouled?: number | null,
      dribble?: number | null,
      season_year?: string | null,
      season_start_time?: number | null,
      season_end_time?: number | null,
      season_league_id?: string | null,
      season_league_name?: string | null,
      season_league_logo?: string | null,
      season_league_short_name?: string | null,
      season_league_primary_color?: string | null,
      season_league_secondary_color?: string | null,
      season_league_round_count?: string | null,
      player_short_name?: string | null,
      player_national_logo?: string | null,
      player_age?: number | null,
      player_birthday?: number | null,
      player_weight?: number | null,
      player_height?: number | null,
      player_market_value?: number | null,
      player_market_value_currency?: string | null,
      player_contract_until?: number | null,
      player_preferred_foot?: number | null,
      player_ability?: string | null,
      player_characteristics?: string | null,
      player_positions?: string | null,
      player_team_id?: string | null,
      player_country_name?: string | null,
      player_country_logo?: string | null,
      team_short_name?: string | null,
      team_country_id?: string | null,
      team_country_name?: string | null,
      team_country_logo?: string | null,
      team_league_id?: string | null,
      team_league_name?: string | null,
      team_league_logo?: string | null,
      team_league_short_name?: string | null,
    } | null > | null,
    teams?:  Array< {
      __typename: "Team",
      market_value?: number | null,
      website?: string | null,
      national?: number | null,
      logo?: string | null,
      total_players?: number | null,
      name?: string | null,
      updated_at?: number | null,
      venue_id?: string | null,
      coach_id?: string | null,
      short_name?: string | null,
      foundation_time?: number | null,
      country_id?: string | null,
      foreign_players?: number | null,
      country_logo?: string | null,
      market_value_currency?: string | null,
      national_players?: number | null,
      id?: string | null,
      country_name?: string | null,
      league_id?: string | null,
      league_name?: string | null,
      league_logo?: string | null,
      coach_name?: string | null,
      coach_logo?: string | null,
    } | null > | null,
    leagues?:  Array< {
      __typename: "League",
      id?: string | null,
      category_id?: string | null,
      country_id?: string | null,
      name?: string | null,
      short_name?: string | null,
      logo?: string | null,
      type?: number | null,
      cur_seasons_id?: string | null,
      cur_stage_id?: string | null,
      cur_round?: number | null,
      round_count?: number | null,
      primary_color?: string | null,
      secondary_color?: string | null,
      updated_at?: string | null,
      category_name?: string | null,
      country_name?: string | null,
    } | null > | null,
    countries?:  Array< {
      __typename: "Country",
      name?: string | null,
      id?: string | null,
      category_id?: string | null,
      logo?: string | null,
      updated_at?: string | null,
      category_name?: string | null,
    } | null > | null,
  } | null,
};

export type Search_usersQueryVariables = {
  term?: string | null,
};

export type Search_usersQuery = {
  search_users?: Array< string | null > | null,
};
