import { Column } from '../../../pages/TablePage/model/types/TrackSchema';

export const columns:Column[] = [
  {
    accessorKey: 'title',
    header: 'title',
  },
  {
    accessorKey: 'description',
    header: 'description',
  },
  {
    accessorKey: 'audio',
    header: 'audio',
  },
  {
    accessorKey: 'cover',
    header: 'cover',
  },
  {
    accessorKey: 'createdAt',
    header: 'createdAt',
  },
  {
    accessorKey: 'isActive',
    header: 'isActive',
  },
  {
    accessorKey: 'actions',
    header: 'actions',
  },
];
