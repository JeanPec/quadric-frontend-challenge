import React from "react";

import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button/Button";
import { faEye } from '@fortawesome/free-solid-svg-icons'

import "./WorkflowRow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useConfig } from "../../context";
import { secToMin, secToMinMobile } from "../../utils";

export interface WorkflowRowProps {
    id: number,
    state: boolean,
    duration: number,
    createdDate: string,
    onJobClick: (workspaceId: number) => void,
}

/*
    Workflow Row:
        - Each Row represent a Workflow
        - To Support Mobile use Context to use smaller or bigger number for create at and uration
        - display button when workflow has failed, to display the failed tasks
        - Alternative display button for all workflows Success or Fail
 */

export const WorkflowRow = ({id, state, duration, createdDate, onJobClick}: WorkflowRowProps) => {
  const { isMobile } = useConfig();
  
  return (
    <tr className="content-row">
      <td>
        <h2>Workflow {id}</h2>
      </td>
      <td className="centered">
      <Badge state={state}/>
      </td>
      <td className="centered">{isMobile ? secToMinMobile(duration) : secToMin(duration)}</td>
      <td className="centered">
        {isMobile ? new Date(createdDate).toLocaleString('en-us', { month: 'short', day: 'numeric', year: 'numeric'}) : new Date(createdDate).toLocaleString('en-us')}
      </td>
      <td className="centered">
      {state && <span> - </span>}
      {!state && <Button  iconAfter={<FontAwesomeIcon className='icon' icon={faEye} />} onClick={() => onJobClick(id)} aria-label={'See Failed Jobs'}>
        {'See Failed Jobs'}
      </Button>}
      </td>
    </tr>
  );
}