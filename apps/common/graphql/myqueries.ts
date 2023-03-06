
export const findTeam = `
query Search($term: String) {
  search(term: $term) {
    teams {
      country_id
      country_logo
      country_name
      id
      name
      logo
      league_id
      league_name
      league_logo
    }
  }
}
`

export const findPlayer = `
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
    }
  }
}
`
export const findLeague = `
query Search($term: String) {
  search(term: $term) {
    leagues {
      id
      name
    }
  }
}
`
export const findCountry = `
query Search($term: String) {
  search(term: $term) {
    countries {
      id
      name
    }
  }
}
`
