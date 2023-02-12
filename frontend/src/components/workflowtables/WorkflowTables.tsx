import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";

import { useFetch } from "../../customeHooks/useFetch";
import { Button, Modal, SearchBar } from "../../ui";
import { JobType, WorkflowType } from "../../utils";
import { WorkflowRow } from "../worflowRow/WorkflowRow";
import { Empty, Loader } from "../../ui/splashes";
import "./WorkflowTables.css";

/*
    Workflow Table:
        - Display as a table the different Workflows
        - Search bar that searches on id
        - Sort Button to sort from A-Z and Z-A on Name
        - TO DO Create generic Table Component so I can do a table for the Workflows and the Job
        - TO DO Each Row would be a link to the Workflow, add highlight when hovering
        - TO DO Add sorting on each Column
        - TO DO Add User column + Tooltip to see email and name
 */


export const WorkflowTables = () => {
  const [showModal, setShowModal] = useState(false);
  const [dataSorted, setDataSorted] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [hasSearch, setHasSearch] = useState(false);
  const [sortedAZ, setSortedAZ] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const { data: dataWorkflows, loading: loadingWorkflows } = useFetch({endpoint: "workflows"});
  const { data: jobs, loading: loadingJobs} = useFetch({endpoint: "jobs"});

  useEffect(() => {
    if(!loadingWorkflows) {
      if(hasSearch) {
        setDataSorted([...dataSorted].sort((a: WorkflowType, b: WorkflowType) => {
          if(sortedAZ) return a.id - b.id;
          return b.id - a.id
        }))
      } else {
        setDataSorted([...dataWorkflows].sort((a: WorkflowType, b: WorkflowType) => {
          if(sortedAZ) return a.id - b.id;
          return b.id - a.id
        }))
      }
    }
  }, [sortedAZ, loadingWorkflows, dataWorkflows])

  const handleClick = (workspaceId: number) => {
    setSelectedJobs(jobs.filter((job: JobType)=>(job.workflow_id === workspaceId && job.status !== 'success')));
    setShowModal(true);
  }

  const handleSearch = (search: string) => {
    setLoadingSearch(true);
    if(search!=='') {
      setLoadingSearch(true);
      setDataSorted(dataWorkflows.filter((element: WorkflowType) => element.id.toString().includes(search) ));
      setLoadingSearch(false);
    }
    else {
      setHasSearch(false);
      setDataSorted(dataWorkflows);
      setLoadingSearch(false);
    }
  }

  const loading = loadingWorkflows || loadingJobs || loadingSearch;

  if(loading) return <Loader />;

  return (
    <div>
      <section className="filter">
          <SearchBar onSearch={handleSearch}  />
          <Button onClick={()=>setSortedAZ(!sortedAZ)} iconAfter={<FontAwesomeIcon className='icon' icon={sortedAZ ? faCaretDown : faCaretUp} />}>{sortedAZ ? 'Sort A-Z' : 'Sort Z-A'}</Button>
      </section>
    <table>
      <thead>
        <tr className="header">
          <th>Name</th>
          <th>Status</th>
          <th>Duration</th>
          <th>Creation Date</th>
          <th>See Failed Jobs</th>
        </tr>
      </thead>
      { dataSorted.length !== 0 && <tbody className="content">
        {dataSorted.map((element: WorkflowType) => (
            <WorkflowRow
              key={element.id}
              id={element.id}
              state={element.status === "success"}
              duration={element.duration_seconds}
              createdDate={element.created_at}
              onJobClick={handleClick}
            />
          ))}
      </tbody>}
    </table>
    { dataSorted.length === 0 && <Empty />}
    {showModal && <Modal jobs={selectedJobs} onClose={()=> setShowModal(false)} />}
    </div>
  );
};
