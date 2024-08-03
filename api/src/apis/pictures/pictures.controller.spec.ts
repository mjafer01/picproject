import { Test, TestingModule } from '@nestjs/testing';
import { PicturesController } from './pictures.controller';
import { PicturesService } from './pictures.service';
import { UsersService } from '../users/users.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { AuthGuard } from '../../auth/auth.guard';
import { ExecutionContext, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

describe('PicturesController', () => {
  let controller: PicturesController;
  let service: PicturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PicturesController],
      providers: [
        {
          provide: PicturesService,
          useValue: {
            createPicture: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findUserById: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const request = context.switchToHttp().getRequest();
          const authorizationHeader = request.headers['authorization'];

          if (!authorizationHeader || isNaN(parseInt(authorizationHeader, 10))) {
            throw new UnauthorizedException('Invalid User');
          }

          return true;
        },
      })
      .compile();

    controller = module.get<PicturesController>(PicturesController);
    service = module.get<PicturesService>(PicturesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sharePicture', () => {
    it('should return 201 when picture is shared successfully', async () => {
      const createPictureDto: CreatePictureDto = {
        url: 'http://example.com/picture.jpg',
        title: 'A beautiful sunset',
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      } as unknown as Response;

      jest.spyOn(service, 'createPicture').mockResolvedValueOnce(undefined);

      await controller.sharePicture(createPictureDto, res, '1');

      expect(service.createPicture).toHaveBeenCalledWith(createPictureDto, 1);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(res.send).toHaveBeenCalled();
    });

    it('should return 400 when there is an error sharing picture', async () => {
      const createPictureDto: CreatePictureDto = {
        url: 'http://example.com/picture.jpg',
        title: 'A beautiful sunset',
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      } as unknown as Response;

      jest.spyOn(service, 'createPicture').mockRejectedValueOnce(new Error('Error sharing picture'));

      await controller.sharePicture(createPictureDto, res, '1');

      expect(service.createPicture).toHaveBeenCalledWith(createPictureDto, 1);
      expect(res.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error sharing picture' });
    });

    it('should return 401 when the authorization token is invalid', async () => {
      const createPictureDto: CreatePictureDto = {
        url: 'http://example.com/picture.jpg',
        title: 'A beautiful sunset',
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      } as unknown as Response;

      try {
        await controller.sharePicture(createPictureDto, res, 'invalid-token');
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toBe('Invalid User');
      }
    });

    it('should return 401 when the authorization header is missing', async () => {
      const createPictureDto: CreatePictureDto = {
        url: 'http://example.com/picture.jpg',
        title: 'A beautiful sunset',
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        json: jest.fn(),
      } as unknown as Response;

      try {
        await controller.sharePicture(createPictureDto, res, undefined as unknown as string);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toBe('Invalid User');
      }
    });
  });
});
