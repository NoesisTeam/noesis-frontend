import { Pipe, PipeTransform } from '@angular/core';
import { parse } from 'date-fns';
import { Club } from '../core/domain/entities';
import { ClubsService } from '../core/services';

@Pipe({
    name: 'filter',
    standalone: true,
})
export class FilterPipe implements PipeTransform {

    constructor(private ClubsService: ClubsService){}

    transform(values: Club[], ...args: string[]): Club[] {

        if (!this.isValidArray(values) || !this.hasValidSearchQuery(args)) {
            //this.ClubsService.setFilteredData(values); // Actualiza el servicio con los datos originales
            return values;
        }

        const [query, ...properties]: string[] = args;
        const lowerQuery = query.toLowerCase();
        const dateQuery = parse(lowerQuery, 'dd/MM/yyyy', new Date());;

        if(this.isValidDate(dateQuery)){
            return this.filterByDate(values, dateQuery, properties);
        }

        return this.filterByString(values, lowerQuery, properties);


    }

    private isValidArray(Clubs: Club[]): boolean{
        return Array.isArray(Clubs);
    }

    private hasValidSearchQuery(searchArgs: string[]): boolean{
        const [query] = searchArgs;
        return !(!query || query.length < 3);
    }

    private isValidDate(dateQuery: Date): boolean{
        return !isNaN(dateQuery.getTime());
    }

    private filterByString(
        values: Club[],
        lowerQuery: string,
        properties: string[]
    ): Club[] {
        const filtered_data = values.filter((item: Club) =>
            properties
                .flat()
                .some((property: string) => {
                    //if (property !== 'club_date' && property !== 'club_other_date') {
                    return item[property].toLowerCase().includes(lowerQuery)
                    //}
                })
        );
        //this.ClubsService.setFilteredData(filtered_data);
        return filtered_data;
    }
    private filterByDate(
        values: Club[],
        dateQuery: Date,
        properties: string[]
    ): Club[] {
        const filtered_data = values.filter((item: Club) =>
            properties
                .flat()
                .some((property) => {
                    const itemContent = item[property].split("T")[0]
                    const itemDate = parse(itemContent.toLowerCase(), 'yyyy-MM-dd', new Date());
                    if (
                        this.isValidDate(itemDate) &&
                        itemDate.toDateString() === dateQuery.toDateString()
                    ) {
                        console.log("Sii");
                        return true;
                    }
                    return false;
                })
        );
        //this.ClubsService.setFilteredData(filtered_data);
        return filtered_data
    }
}