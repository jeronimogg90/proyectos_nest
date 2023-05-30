import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid} from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota', 
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },{
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        }
    ];

    findAll(){
        return this.cars
    }

    findById(id){
        const car = this.cars.find(car => car.id === id)

        if( !car ) throw new NotFoundException(`Car whit id: '${id}' not found`)
        
        return car
    }

    create(createCarDto: CreateCarDto){
        const car:Car = {
            id: uuid(),
            ...createCarDto
        }

        this.cars.push( car )

        return car;
    }

    update (id: string, updateCardDto: UpdateCarDto ){

        let carDB = this.findById(id)

        if( updateCardDto.id && updateCardDto.id !== id ){
            throw new BadRequestException(`Car ID no es el del coche que quieres actualizar`)
        }

        this.cars = this.cars.map( car => {
            if( car.id === id){
                carDB = {
                    ...carDB,
                    ...updateCardDto,
                    id
                }

                return carDB
            }

            return car
        })

        return carDB
    }

    delete (id: string){
        let carDB = this.findById(id)
        this.cars = this.cars.filter (car => car.id !== id)
    }

    fillCarsWithSeedData( cars: Car[]){
        this.cars = cars
    }
}
