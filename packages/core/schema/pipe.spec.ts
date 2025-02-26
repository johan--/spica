import { Schema } from './pipe';
import { Validator } from './validator';

describe('schema pipe', () => {

    describe('validation with schema', () => {
        let pipe;
        beforeAll(async () => {
            const validatorMixin = Schema.validate({ type: 'string' });
            pipe = new validatorMixin(new Validator());
        })

        it('should fail with validation errors', () => {
            expectAsync(pipe.transform({})).toBeRejected();
        })

        it('should pass the validation', () => {
            expectAsync(pipe.transform('')).toBeResolvedTo('');
        });
    })


    describe('validation with uri', () => {
        let pipe;

        beforeAll(() => {
            const validatorMixin = Schema.validate('schema-uri');
            const validator = new Validator();
            pipe = new validatorMixin(validator);
            validator.registerUriResolver(() => Promise.resolve({ type: 'string' }))
        })

        it('should fail with validation errors', () => {
            expectAsync(pipe.transform({})).toBeRejected();
        })

        it('should pass the validation', () => {
            expectAsync(pipe.transform('')).toBeResolvedTo('');
        });
    })

    describe('validation with dynamic uri', () => {
        let pipe;
        let uriResolver: jasmine.Spy;
        let dynamicUri: jasmine.Spy;
        const req: any = {};

        beforeAll(() => {
            dynamicUri = jasmine.createSpy('dynamic-uri').and.returnValue('schema-uri');
            uriResolver =
                jasmine.createSpy('uri-resolver').and.returnValue(Promise.resolve({ type: 'string' }))
            const validatorMixin = Schema.validate(dynamicUri);
            const validator = new Validator();
            validator.registerUriResolver(uriResolver);
            pipe = new validatorMixin(validator, req);
        })

        it('should fail with validation errors', () => {
            expectAsync(pipe.transform({})).toBeRejected();
        })

        it('should pass the validation', () => {
            expectAsync(pipe.transform('')).toBeResolvedTo('');
        });

        it('should call dynamic uri function', async () => {
            await expectAsync(pipe.transform({})).toBeRejected();
            expect(dynamicUri).toHaveBeenCalled();
            expect(dynamicUri.calls.mostRecent().args[0]).toBe(req);
        })

        it('it should have called uri-resolver', async () => {
            await expectAsync(pipe.transform({})).toBeRejected();
            expect(uriResolver).toHaveBeenCalled();
            expect(uriResolver.calls.mostRecent().args[0]).toBe('schema-uri');
        })
    })

})