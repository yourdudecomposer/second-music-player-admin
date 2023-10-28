import { TrackFields } from '@/entities/Track/types/types';

export interface Column {
    accessorKey: TrackFields | 'actions',
    header: TrackFields | 'actions'
}
