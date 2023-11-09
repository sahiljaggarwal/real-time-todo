import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({timestamps:true})
export class Todo {
    @Prop({})
    title: string

    @Prop({default:false})
    isComplete: boolean

    @Prop({})
    username:string

    @Prop({})
    description:string
}

export const TodoSchema = SchemaFactory.createForClass(Todo)