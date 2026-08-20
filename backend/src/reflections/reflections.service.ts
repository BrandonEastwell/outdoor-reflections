import { Injectable } from '@nestjs/common';
import { ReflectionsRepository } from './reflections.repository';
import { ReflectionDto } from './reflection.types';

@Injectable()
export class ReflectionsService {
  constructor(private repo: ReflectionsRepository) {}

  createEntry(reflection: ReflectionDto, userId: number) {
    try {
      return this.repo.create(reflection, userId);
    } catch (err) {
      console.log(err);
      throw new Error('Failed to create reflection: ' + err.message);
    }
  }
}
