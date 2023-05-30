import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
@UsePipes(ValidationPipe) 
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ){}

    @Get()
    getAllCars(){
        return this.carsService.findAll()
    }

    @Get(':id')
    getCarsById(@Param('id', new ParseUUIDPipe({ version: '4'})) id: string){
        return this.carsService.findById(id)
    }

    @Post()
    createCar( @Body() createCarDto: CreateCarDto){
        return this.carsService.create( createCarDto )
    }

    @Patch(':id')
    updateCar( 
        @Body() udpateCarDto: UpdateCarDto, 
        @Param('id', ParseUUIDPipe) id:string
    ){
        return this.carsService.update(id, udpateCarDto)
    }

    @Delete(':id')
    deleteCar(@Param('id', ParseUUIDPipe) id: string){
        return this.carsService.delete(id)
    }
}
