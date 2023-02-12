import React, { useRef } from "react";
import { useFetch } from "../../customeHooks/useFetch";
import { Badge, Loader } from "../../ui";
import { TraceType } from "../../utils";

import "./JobRow.css";

export interface JobRowProps {
  id: number;
  state: boolean;
  duration: string;
  stage: string;
  createdDate: string;
}

/*
    Job Row:
        - Jobs are displayed in a Modal
        - each row display the info on a Job
        - display the log in another row with teh info from the rest call ( display it raw since it is a script)
        - For Repsonsiveness change the grid layout
        - TO DO use new Table Component for the Job ( keep modal as a preview and if the user want to see more jobs he can click on a link to the new page)
 */

let globalId = 0;

export const JobRow = ({
  id,
  state,
  duration,
  stage,
  createdDate,
}: JobRowProps) => {
  const { current: ariaId } = useRef(`job-${globalId++}`);

  const { data: traces, loading: loadingTraces} = useFetch({endpoint: "traces"});

  const tracesFiltered = (traces as TraceType[]).find((trace: TraceType)=> trace.job_id === id);

  return (
    <>
      <section>
        <h3> Job {id}</h3>
      </section>
      <div className="job-content">
        <section>
          <Badge state={state} />
        </section>
        <section>
          <label id={`duration-${ariaId}`}>Duration : </label>
          <span aria-labelledby={`duration-${ariaId}`}>{duration}</span>
        </section>
        <section>
          <label id={`created-date-${ariaId}`}>Created date : </label>
          <span aria-labelledby={`created-date-${ariaId}`}>
            {new Date(createdDate).toLocaleString("en-us")}
          </span>
        </section>
        <section>
          <label id={`duration-${ariaId}`}>Stage : </label>
          <span aria-labelledby={`duration-${ariaId}`}>{stage}</span>
        </section>
      </div>
      { loadingTraces && <Loader />}
      { !loadingTraces && <section className="trace">
        <label id={`trace-${ariaId}`}>Trace : </label>
        <pre aria-labelledby={`trace-${ariaId}`}>{tracesFiltered ? tracesFiltered.content :  'Empty Log'}</pre>
      </section>}
    </>
  );
};
