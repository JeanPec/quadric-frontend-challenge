import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { JobRow } from '../../components';
import { JobType, secToMin } from '../../utils';
import { Button } from '../button';
import { Menu } from '../menu';
import { MenuItem } from '../menu/MenuItem';

import './Modal.css';

export interface ModalProps{
    jobs: JobType[];
    onClose : () => void;
}

export const Modal = ({
    jobs,
    onClose,
} : ModalProps) => (
    <div className="modal">
        <section className='modal-header'>
            <Button iconAfter={<FontAwesomeIcon className='icon' icon={faWindowClose} />} className="close" close onClick={onClose}>Close</Button>
        </section>
        <section className='modal-body'>
        <Menu>
          {jobs.map((job) => (
            <MenuItem
              key={`job-${job.id}`}
            >
              <JobRow id={job.id} state={job.status === "success"} duration={secToMin(job.duration_seconds)} stage={job.stage} createdDate={job.created_at} />
            </MenuItem>
          ))}
        </Menu>
        </section>
    </div>
);