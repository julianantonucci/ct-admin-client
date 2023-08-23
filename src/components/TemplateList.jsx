import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classes from './TemplateList.module.scss'
import useAdminAPI from '../hooks/useAdminAPI'
import { ENDPOINTS } from '../constants'

export default function TemplateList() {
  const params = useParams()
  const [endPoint] = useState(
    `${ENDPOINTS.CAMPS}${params.campId}/campaigns/${params.campaignId}/templates`
  )
  const [templates, setTemplates] = useState([])

  const [{ data }] = useAdminAPI(`${endPoint}`, {})

  useEffect(() => {
    setTemplates(data.templates)
  }, [data]) // eslint-disable-line

  const showTemplate = (template) => {
    // console.log(`showTemplate: ${template.messageType}`)
    let layout = data.templates.find(
      (t) =>
        t.fileType === 'html' &&
        t.messageType === template.messageType &&
        t.templateType === 'layout'
    )
    if (!layout) {
      layout = data.templates.find(
        (t) =>
          t.fileType === 'html' &&
          t.messageType === 'default' &&
          t.templateType === 'layout'
      )
    }
    // console.log('layout text: ', layout.text)
    var html = layout.text.replace('{{{email-content}}}', template.text)
    const opts = 'popup=no'
    var win = window.open('', 'email_preview', opts)
    win.document.body.innerHTML = html
  }

  return (
    <div className={classes.template_list}>
      <h3 className={classes.subheading}>Templates</h3>
      <div>
        {templates &&
          templates
            .filter(
              (t) => t.templateType === 'content' && t.fileType === 'html'
            )
            .map((template) => (
              <div key={template.id}>
                <span className={classes.template_name}>
                  {' '}
                  {template.name} -{' '}
                </span>
                {template.heading}&nbsp;
                <span
                  className={classes.view}
                  onClick={() => showTemplate(template)}
                >
                  view
                </span>
              </div>
            ))}
      </div>
    </div>
  )
}
