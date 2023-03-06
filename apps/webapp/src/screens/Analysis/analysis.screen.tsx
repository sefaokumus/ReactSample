import React, { useEffect, useRef, useState } from 'react'

import {  FilePdfOutlined }                        from '@ant-design/icons'
import { useStoreActions, useStoreState }          from '@monorepo/common/hooks'
import { getUrl }                                  from '@monorepo/common/services'
import { isBase64 }                                from '@monorepo/common/utils/helper'
import { Col, Row, Grid, Spin, Button  }           from 'antd'
import html2canvas                                 from 'html2canvas'
import { jsPDF as JsPdf }                          from 'jspdf'
import { createUseStyles }                         from 'react-jss'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import FilterColumn                                from 'src/components/FilterColumn'
import SelectedFilters                             from 'src/components/SelectedFiltersView'

import ShareButton from 'src/components/ShareButton'

import ChartsTypesDropdown from './components/ChartsTypesDropdown'
import ScatterChart        from './components/ScatterChart'
const { useBreakpoint } = Grid

const useStyles = createUseStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '210px 100%',
    gridTemplateRows: 'min-content 1fr',
    gap: '0px 12px',
    width: 'calc(100% - 222px)',
    gridTemplateAreas: '"filters content"  "filters content"'
  },
  mobileRoot: {
    display: 'grid',
    gridTemplateColumns: '100%',
    gridTemplateRows: 'min-content min-content 1fr',
    gridTemplateAreas: '"filters" "content"'

  },
  filtersBox: {
    gridArea: 'filters'
  },
  content: {
    gridArea: 'content'
  },
  selectedFilters: {
    display: 'grid',
    gridTemplateColumns: '1fr min-content min-content min-content',
    gridTemplateRows: 'min-content',
    gap: '0px 4px',
    alignItems: 'center'

  }
})
export default function AttributesScreen () {
  const classes                               = useStyles()
  const screens                               = useBreakpoint()
  const {
    appData: { analysisCharts },
    filters: { analysis, selectedPlayers, isLoading, isSelecting }
  } = useStoreState(state => state)
  const { addToAnalysisCharts }               = useStoreActions(actions => actions.appData)
  const [searchParams]                        = useSearchParams()
  const { key }                               = useParams()
  const navigate                              = useNavigate()
  const [isGettingUrl, setIsGettingUrl]       = useState(false)
  const ref                                   = useRef<HTMLDivElement>(null)
  const [isReadyToExport, setIsReadyToExport] = useState(false)

  useEffect(() => {
    if (key) {
      setIsGettingUrl(true)
      getUrl({ key }).then((url) => {
        setIsGettingUrl(false)
        navigate(url)
      })
    }
  }, [key])

  const generatePDF = async () => {
    const element = ref.current
    if (!element) return

    const canvas = await html2canvas(element)
    const data   = canvas.toDataURL('image/png')

    const pdf           = new JsPdf('p', 'mm', 'a2')
    const imgProperties = pdf.getImageProperties(data)
    const pdfWidth      = pdf.internal.pageSize.getWidth()
    const pdfHeight     = (imgProperties.height * pdfWidth) / imgProperties.width

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('print.pdf')
  }
  return <Spin spinning={isLoading || isSelecting || isGettingUrl || isReadyToExport}>
    <div className={screens.lg ? classes.root : classes.mobileRoot} >
      <div className={classes.filtersBox} >
        <FilterColumn type='analysis' />
      </div>

      <div ref={ref} className={classes.content}>

        <Row gutter={[16, 16]}>
          <Col span={24} className={classes.selectedFilters}>
            <SelectedFilters type='analysis' style={{ margin: '0px 8px 8px 8px' }} />

            <Button onClick={() => {
              setIsReadyToExport(true)
              setTimeout(() => {
                generatePDF()
                setIsReadyToExport(false)
              }, 500)
            }}  type='default' shape='circle' icon={<FilePdfOutlined />} />

            <ShareButton />

            <ChartsTypesDropdown />
          </Col>

          {
            analysisCharts.filter(ac => ac.visible).map((_, i) => (
              <Col sm={24} md={12} xl={8} xxl={6} key={i} >
                <ScatterChart xField={_.xField} yField={_.yField} data={isBase64(searchParams.get('q')) ? analysis : undefined} compareData={isBase64(searchParams.get('q')) ? selectedPlayers : undefined} />
              </Col>
            ))
          }

          <Col sm={24} md={12} xl={8} xxl={6} style={{ width: '100%', minHeight: 460 }} >
            <ScatterChart onAddChart={(data) => {
              addToAnalysisCharts({
                xField: data.xField,
                yField: data.yField,
                isDefault: false,
                visible: true
              })
            }
            } />
          </Col>

        </Row>
      </div>
    </div>
  </Spin>
}
