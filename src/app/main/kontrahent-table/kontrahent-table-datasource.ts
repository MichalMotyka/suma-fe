import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface KontrahentTableItem {
  name: string;
  id: number;
  ppe: number
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: KontrahentTableItem[] = [
  {id: 1, name: 'Hydrogen',ppe: 1000},
  {id: 2, name: 'Helium',ppe: 1000},
  {id: 3, name: 'Lithium',ppe: 1000},
  {id: 4, name: 'Beryllium',ppe: 1000},
  {id: 5, name: 'Boron',ppe: 1000},
  {id: 6, name: 'Carbon',ppe: 1000},
  {id: 7, name: 'Nitrogen',ppe: 1000},
  {id: 8, name: 'Oxygen',ppe: 1000},
  {id: 9, name: 'Fluorine',ppe: 1000},
  {id: 10, name: 'Neon',ppe: 1000},
  {id: 11, name: 'Sodium',ppe: 1000},
  {id: 12, name: 'Magnesium',ppe: 1000},
  {id: 13, name: 'Aluminum',ppe: 1000},
  {id: 14, name: 'Silicon',ppe: 1000},
  {id: 15, name: 'Phosphorus',ppe: 1000},
  {id: 16, name: 'Sulfur',ppe: 1000},
  {id: 17, name: 'Chlorine',ppe: 1000},
  {id: 18, name: 'Argon',ppe: 1000},
  {id: 19, name: 'Potassium',ppe: 1000},
  {id: 20, name: 'Calcium',ppe: 1000},
];

/**
 * Data source for the KontrahentTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class KontrahentTableDataSource extends DataSource<KontrahentTableItem> {
  data: KontrahentTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<KontrahentTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: KontrahentTableItem[]): KontrahentTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: KontrahentTableItem[]): KontrahentTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'ppe': return compare(a.ppe,b.ppe,isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
