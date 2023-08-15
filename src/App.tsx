import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import axios from 'axios';
import { useEffect, useState } from 'react';

type IApiRow = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;
};

const App = () => {
    const [data, setData] = useState<IApiRow[]>([]);

    useEffect(() => {
        (async function apiCall() {
            if (data.length < 1) {
                const url = await axios.get('http://localhost:3000/data');
                const apiData: IApiRow[] = url.data;
                setData(apiData);
            }
        })();
    }, []);

    const columns: ColumnDef<IApiRow>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'first_name',
            header: 'First Name',
        },
    ];

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className='w3-container'>
            <table className='w3-table-all'>
                <thead>
                    {table.getHeaderGroups().map((item, index) => (
                        <tr key={index}>
                            {item.headers.map((subItem) => (
                                <th key={subItem.id}>
                                    {flexRender(
                                        subItem.column.columnDef.header,
                                        subItem.getContext()
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((item) => (
                        <tr key={item.id}>
                            {item.getVisibleCells().map((subItem) => (
                                <td key={subItem.id}>
                                    {flexRender(
                                        subItem.column.columnDef.cell,
                                        subItem.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                    <button onClick={() => table.setPageIndex(0)}>
                        First Page
                    </button>
                    <button
                        disabled={!table.getCanPreviousPage()}
                        onClick={table.previousPage}
                    >
                        Prev Page
                    </button>
                    <button
                        disabled={!table.getCanNextPage()}
                        onClick={table.nextPage}
                    >
                        Next Page
                    </button>
                    <button
                        onClick={() =>
                            table.setPageIndex(table.getPageCount() - 1)
                        }
                    >
                        Last Page
                    </button>
                    {table.getState().pagination.pageIndex + 1}-
                    {table.getPageCount()}
                </tbody>
            </table>
        </div>
    );
};

export default App;
