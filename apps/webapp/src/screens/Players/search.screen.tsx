import React from 'react'

import { useStoreActions, useStoreState }         from '@monorepo/common/hooks'
import { Button, Col, Input, Row, Select, Space } from 'antd'
import PlayerCard                                 from 'src/components/PlayerCard'

const { Option } = Select

export default function PlayersSearchScreen () {
  const {
    countries: { data: countries, isLoading: countriesLoading },
    leagues: { data: leagues, isLoading: leaguesLoading },
    teams: { data: teams, isLoading: teamsLoading },
    players: { data: players, isLoading: playersLoading }
  } = useStoreState(store => store)
  const {
    countries: { getCountries },
    leagues: { getLeagues },
    teams: { getTeams },
    players: { getPlayers }
  } = useStoreActions(actions => actions)

  const [selectedCountry, setSelectedCountry] = React.useState<string | undefined>(undefined)
  const [selectedLeague, setSelectedLeague]   = React.useState<string | undefined>(undefined)
  const [selectedTeam, setSelectedTeam]       = React.useState<string | undefined>(undefined)
  const [selectedPlayer, setSelectedPlayer]   = React.useState<string | undefined>(undefined)

  const player = players?.find(player => player.id === selectedPlayer)

  React.useEffect(() => {
    getCountries()
  }, [])

  React.useEffect(() => {
    if (selectedCountry) {
      getLeagues({ country_id: selectedCountry })
    }
  }, [selectedCountry])

  React.useEffect(() => {
    if (selectedLeague) {
      getTeams({ league_id: selectedLeague })
    }
  }, [selectedLeague])

  React.useEffect(() => {
    if (selectedTeam) {
      getPlayers({ team_id: selectedTeam })
    }
  }, [selectedTeam])

  return (<React.Fragment>
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space wrap>
          <Input.Group compact>
            <Select
              showSearch
              placeholder="Country"
              optionFilterProp="children"
              value={selectedCountry}
              loading={countriesLoading}
              onChange={val => setSelectedCountry(val)}
              style={{ width: 300 }}
              filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              { countries  && countries.map(countries => <Option key={countries.id} value={countries.id}>{countries.name}</Option>)}
            </Select>
            <Button type='primary'>&gt;</Button>
          </Input.Group>

          <Input.Group compact>
            <Select
              showSearch
              placeholder="Leagues"
              optionFilterProp="children"
              onChange={val => setSelectedLeague(val)}
              loading={leaguesLoading}
              disabled={!selectedCountry || leagues?.length === 0}
              style={{ width: 300 }}
              filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              { leagues  && leagues.map(league => <Option key={league.id} value={league.id}>{league.name}</Option>)}
            </Select>
            <Button type='primary'>&gt;</Button>
          </Input.Group>

          <Input.Group compact>
            <Select
              showSearch
              placeholder="Teams"
              optionFilterProp="children"
              onChange={val => setSelectedTeam(val)}
              loading={teamsLoading}
              disabled={!selectedCountry || leagues?.length === 0 || !selectedLeague || teams?.length === 0}
              style={{ width: 300 }}
              filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              { teams  && teams.map(team => <Option key={team.id} value={team.id}>{team.name}</Option>)}
            </Select>
            <Button type='primary'>&gt;</Button>
          </Input.Group>

          <Input.Group compact>
            <Select
              showSearch
              placeholder="Players"
              optionFilterProp="children"
              onChange={val => setSelectedPlayer(val)}
              loading={playersLoading}
              disabled={!selectedCountry || leagues?.length === 0 || !selectedLeague || teams?.length === 0 || !selectedTeam || players?.length === 0}
              style={{ width: 300 }}
              filterOption={(input, option) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              { players  && players.map(player => <Option key={player.id} value={player.id}>{player.name}</Option>)}
            </Select>
            <Button type='primary'>&gt;</Button>
          </Input.Group>
        </Space>
      </Col>
      <Col  span={24}>
        {
          player && <PlayerCard player={player} />
        }
      </Col>
    </Row>
  </React.Fragment>

  )
}
