// Ensuring types from @nestjs/common are globally accessible
import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
declare global {
  type NestCanActivate = CanActivate;
  type NestExecutionContext = ExecutionContext;
  type NestUnauthorizedException = UnauthorizedException;
  type Module = Module;
  type TypeOrmModule = TypeOrmModule;
}

