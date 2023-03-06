/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const sql = /* GraphQL */ `
  query Sql($query: String) {
    sql(query: $query)
  }
`;
export const get_countries = /* GraphQL */ `
  query Get_countries {
    get_countries {
      name
      id
      category_id
      logo
      updated_at
      category_name
    }
  }
`;
export const get_country = /* GraphQL */ `
  query Get_country($country_id: String) {
    get_country(country_id: $country_id) {
      name
      id
      category_id
      logo
      updated_at
      category_name
    }
  }
`;
export const get_my_shortlists = /* GraphQL */ `
  query Get_my_shortlists {
    get_my_shortlists {
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
export const get_leagues = /* GraphQL */ `
  query Get_leagues($league_id: String) {
    get_leagues(league_id: $league_id) {
      id
      category_id
      country_id
      name
      short_name
      logo
      type
      cur_seasons_id
      cur_stage_id
      cur_round
      round_count
      primary_color
      secondary_color
      updated_at
      category_name
      country_name
    }
  }
`;
export const get_league = /* GraphQL */ `
  query Get_league($league_id: String) {
    get_league(league_id: $league_id) {
      id
      category_id
      country_id
      name
      short_name
      logo
      type
      cur_seasons_id
      cur_stage_id
      cur_round
      round_count
      primary_color
      secondary_color
      updated_at
      category_name
      country_name
    }
  }
`;
export const get_players = /* GraphQL */ `
  query Get_players($team_id: String) {
    get_players(team_id: $team_id) {
      id
      team_id
      name
      short_name
      logo
      national_logo
      birthday
      age
      weight
      height
      country_id
      nationality
      market_value
      market_value_currency
      contract_until
      preferred_foot
      ability
      characteristics
      updated_at
      team_name
      team_logo
      league_id
      league_name
      country_name
      position
      positions
      country_logo
      league_logo
      offer_history {
        offerDate
        offer_id
        transfer_season
        note
      }
    }
  }
`;
export const get_player = /* GraphQL */ `
  query Get_player($player_id: String) {
    get_player(player_id: $player_id) {
      id
      team_id
      name
      short_name
      logo
      national_logo
      birthday
      age
      weight
      height
      country_id
      nationality
      market_value
      market_value_currency
      contract_until
      preferred_foot
      ability
      characteristics
      updated_at
      team_name
      team_logo
      league_id
      league_name
      country_name
      position
      positions
      country_logo
      league_logo
      offer_history {
        offerDate
        offer_id
        transfer_season
        note
      }
    }
  }
`;
export const get_player_match_stat = /* GraphQL */ `
  query Get_player_match_stat($player_id: String) {
    get_player_match_stat(player_id: $player_id) {
      key_passes
      saves
      crosses_accuracy
      runs_out_succ
      punches
      freekick_goals
      clearances
      passes_accuracy
      crosses
      minutes_played
      goals
      long_balls
      first
      blocked_shots
      passes
      red_cards
      yellow2red_cards
      penalty
      offsides
      tackles
      duels_won
      dribble_succ
      good_high_claim
      hit_woodwork
      runs_out
      shots
      rating
      fastbreak_goals
      assists
      dispossessed
      yellow_cards
      interceptions
      long_balls_accuracy
      fastbreak_shots
      shots_on_target
      fastbreaks
      fouls
      duels
      freekicks
      was_fouled
      poss_losts
      dribble
      team_id
      team_name
      team_short_name
      team_logo
      team_country_logo
      player_id
      player_name
      player_short_name
      player_logo
      player_national_logo
      player_age
      player_birthday
      player_weight
      player_height
      player_country_id
      player_country_name
      player_country_logo
      player_nationality
      player_market_value
      player_market_value_currency
      player_contract_until
      player_preferred_foot
      player_ability
      player_characteristics
      player_position
      player_positions
      match_id
      match_season_id
      match_home_team_id
      match_away_team_id
      match_league_id
      match_league_name
      match_league_logo
      match_league_short_name
      match_league_primary_color
      match_league_secondary_color
      match_league_round_count
      season_year
      season_start_time
      season_end_time
      match_home_team_name
      match_home_team_short_name
      match_home_team_logo
      match_home_team_country_id
      match_home_team_country_name
      match_home_team_country_logo
      match_away_team_name
      match_away_team_short_name
      match_away_team_logo
      match_away_team_country_id
      match_away_team_country_name
      match_away_team_country_logo
    }
  }
`;
export const get_player_season_stat = /* GraphQL */ `
  query Get_player_season_stat($player_id: String) {
    get_player_season_stat(player_id: $player_id) {
      key_passes
      saves
      crosses_accuracy
      runs_out_succ
      player_name
      player_logo
      player_id
      player_position
      player_nationality
      player_country_id
      crosses
      minutes_played
      long_balls
      red_cards
      yellow2red_cards
      team_name
      team_logo
      team_id
      tackles
      hit_woodwork
      runs_out
      rating
      fastbreak_goals
      fastbreak_shots
      yellow_cards
      long_balls_accuracy
      shots_on_target
      updated_at
      season_id
      fastbreaks
      freekicks
      punches
      freekick_goals
      clearances
      passes_accuracy
      goals
      first
      blocked_shots
      passes
      offsides
      penalty
      duels_won
      dribble_succ
      good_high_claim
      shots
      assists
      dispossessed
      matches
      interceptions
      fouls
      court
      duels
      poss_losts
      was_fouled
      dribble
      season_year
      season_start_time
      season_end_time
      season_league_id
      season_league_name
      season_league_logo
      season_league_short_name
      season_league_primary_color
      season_league_secondary_color
      season_league_round_count
      player_short_name
      player_national_logo
      player_age
      player_birthday
      player_weight
      player_height
      player_market_value
      player_market_value_currency
      player_contract_until
      player_preferred_foot
      player_ability
      player_characteristics
      player_positions
      player_team_id
      player_country_name
      player_country_logo
      team_short_name
      team_country_id
      team_country_name
      team_country_logo
      team_league_id
      team_league_name
      team_league_logo
      team_league_short_name
    }
  }
`;
export const get_rows = /* GraphQL */ `
  query Get_rows($shortlist_id: String, $row_id: String, $columns: [String]) {
    get_rows(shortlist_id: $shortlist_id, row_id: $row_id, columns: $columns)
  }
`;
export const get_url = /* GraphQL */ `
  query Get_url($key: String) {
    get_url(key: $key)
  }
`;
export const get_teams = /* GraphQL */ `
  query Get_teams($league_id: String!) {
    get_teams(league_id: $league_id) {
      market_value
      website
      national
      logo
      total_players
      name
      updated_at
      venue_id
      coach_id
      short_name
      foundation_time
      country_id
      foreign_players
      country_logo
      market_value_currency
      national_players
      id
      country_name
      league_id
      league_name
      league_logo
      coach_name
      coach_logo
      offer_history {
        offerDate
        offer_id
        transfer_season
        note
      }
    }
  }
`;
export const get_team = /* GraphQL */ `
  query Get_team($team_id: String) {
    get_team(team_id: $team_id) {
      market_value
      website
      national
      logo
      total_players
      name
      updated_at
      venue_id
      coach_id
      short_name
      foundation_time
      country_id
      foreign_players
      country_logo
      market_value_currency
      national_players
      id
      country_name
      league_id
      league_name
      league_logo
      coach_name
      coach_logo
      offer_history {
        offerDate
        offer_id
        transfer_season
        note
      }
    }
  }
`;
export const get_user_setting = /* GraphQL */ `
  query Get_user_setting {
    get_user_setting
  }
`;
export const search = /* GraphQL */ `
  query Search($term: String) {
    search(term: $term) {
      players {
        key_passes
        saves
        crosses_accuracy
        runs_out_succ
        player_name
        player_logo
        player_id
        player_position
        player_nationality
        player_country_id
        crosses
        minutes_played
        long_balls
        red_cards
        yellow2red_cards
        team_name
        team_logo
        team_id
        tackles
        hit_woodwork
        runs_out
        rating
        fastbreak_goals
        fastbreak_shots
        yellow_cards
        long_balls_accuracy
        shots_on_target
        updated_at
        season_id
        fastbreaks
        freekicks
        punches
        freekick_goals
        clearances
        passes_accuracy
        goals
        first
        blocked_shots
        passes
        offsides
        penalty
        duels_won
        dribble_succ
        good_high_claim
        shots
        assists
        dispossessed
        matches
        interceptions
        fouls
        court
        duels
        poss_losts
        was_fouled
        dribble
        season_year
        season_start_time
        season_end_time
        season_league_id
        season_league_name
        season_league_logo
        season_league_short_name
        season_league_primary_color
        season_league_secondary_color
        season_league_round_count
        player_short_name
        player_national_logo
        player_age
        player_birthday
        player_weight
        player_height
        player_market_value
        player_market_value_currency
        player_contract_until
        player_preferred_foot
        player_ability
        player_characteristics
        player_positions
        player_team_id
        player_country_name
        player_country_logo
        team_short_name
        team_country_id
        team_country_name
        team_country_logo
        team_league_id
        team_league_name
        team_league_logo
        team_league_short_name
      }
      teams {
        market_value
        website
        national
        logo
        total_players
        name
        updated_at
        venue_id
        coach_id
        short_name
        foundation_time
        country_id
        foreign_players
        country_logo
        market_value_currency
        national_players
        id
        country_name
        league_id
        league_name
        league_logo
        coach_name
        coach_logo
      }
      leagues {
        id
        category_id
        country_id
        name
        short_name
        logo
        type
        cur_seasons_id
        cur_stage_id
        cur_round
        round_count
        primary_color
        secondary_color
        updated_at
        category_name
        country_name
      }
      countries {
        name
        id
        category_id
        logo
        updated_at
        category_name
      }
    }
  }
`;
export const search_users = /* GraphQL */ `
  query Search_users($term: String) {
    search_users(term: $term)
  }
`;
