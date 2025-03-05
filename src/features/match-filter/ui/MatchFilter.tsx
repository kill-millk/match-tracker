import { FilterStatus, StatusOption } from '../model/types';
import { Select } from '../../../shared/ui/select/Select';
import { LOCAL_STORAGE_KEYS } from '../../../shared/config/constants';
import { useLocalStorage } from '../../../shared/lib/hooks/useLocalStorage';

const statusOptions: StatusOption[] = [
	{ value: 'all', label: 'Все статусы' },
	{ value: 'Live', label: 'Live' },
	{ value: 'Finished', label: 'Finished' },
	{ value: 'Scheduled', label: 'Match preparing' },
];

interface MatchFilterProps {
	onStatusChange: (status: FilterStatus) => void;
}

export const MatchFilter = ({ onStatusChange }: MatchFilterProps) => {
	const [selectedStatus, setSelectedStatus] = useLocalStorage<FilterStatus>(
		LOCAL_STORAGE_KEYS.SELECTED_STATUS,
		'all'
	);

	const handleStatusChange = (value: string) => {
		const newStatus = value as FilterStatus;
		setSelectedStatus(newStatus);
		onStatusChange(newStatus);
	};

	return (
		<Select
			value={selectedStatus}
			onChange={handleStatusChange}
			options={statusOptions}
		/>
	);
};
