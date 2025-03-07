import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Hunterio, EmailCountRequest, EmailCountResponse, FindEmailRequest } from '../src';
import { VerifyEmailRequest } from '../src/Hunterio';

describe('Hunterio', () => {
  // @ts-ignore
  const API_KEY: string = process.env.API_KEY;
  describe('Constructor', async () => {
    it('should throw if api key is not provided', async () => {
      // @ts-ignore
      const token = 'abcd';
      expect(() => {
        // @ts-ignore
        const hunterio = new Hunterio();
      }).to.throw('API key is required');
    });
  });
  describe('Account Information', () => {
    it('should get account information', async () => {
      const hunterio = new Hunterio(API_KEY);
      const results = await hunterio.getAccountInformation();
      expect(results).to.have.property('data');
      expect(results.data).to.have.property('first_name');
      expect(results.data).to.have.property('last_name');
      expect(results.data).to.have.property('email');
      expect(results.data).to.have.property('plan_name');
      expect(results.data).to.have.property('plan_level');
      expect(results.data).to.have.property('reset_date');
      expect(results.data).to.have.property('team_id');
      expect(results.data).to.have.property('calls');
      expect(results.data.calls).to.have.property('used');
      expect(results.data.calls).to.have.property('available');
    });
  });
  describe('Domain Search', () => {
    it('should search domain', async () => {
      const hunterio = new Hunterio(API_KEY);
      const results = await hunterio.searchDomain('hunter.io');
      expect(results).to.have.property('data');
      expect(results.data).to.have.property('domain');
      expect(results.data).to.have.property('disposable');
      expect(results.data).to.have.property('webmail');
      expect(results.data).to.have.property('pattern');
      expect(results.data).to.have.property('organization');
      expect(results.data).to.have.property('emails');
      expect(results.data.emails).to.have.length.greaterThan(0);
      expect(results).to.have.property('meta');
      expect(results.meta).to.have.property('results');
      expect(results.meta).to.have.property('limit');
      expect(results.meta).to.have.property('offset');
    });
  });
  describe('Domain Search with object params', () => {
    it('should search domain', async () => {
      const hunterio = new Hunterio(API_KEY);
      const results = await hunterio.searchDomain({ domain: 'hunter.io' });
      expect(results).to.have.property('data');
      expect(results.data).to.have.property('domain');
      expect(results.data).to.have.property('disposable');
      expect(results.data).to.have.property('webmail');
      expect(results.data).to.have.property('pattern');
      expect(results.data).to.have.property('organization');
      expect(results.data).to.have.property('emails');
      expect(results.data.emails).to.have.length.greaterThan(0);
      expect(results).to.have.property('meta');
      expect(results.meta).to.have.property('results');
      expect(results.meta).to.have.property('limit');
      expect(results.meta).to.have.property('offset');
    });
  });
  describe('Email Finder', () => {
    it('should search domain', async () => {
      const hunterio = new Hunterio(API_KEY);
      const findEmailRequest: FindEmailRequest = {
        domain: 'Hunter.io',
        company: 'Hunter.io',
        first_name: 'Alex',
        last_name: 'Leventer',
        full_name: 'Alex Leventer',
      };
      const results = await hunterio.findEmail(findEmailRequest);
      expect(results).to.have.property('data');
      expect(results.data).to.have.property('first_name');
      expect(results.data).to.have.property('last_name');
      expect(results.data).to.have.property('email');
      expect(results.data).to.have.property('score');
      expect(results.data).to.have.property('domain');
      expect(results.data).to.have.property('position');
      expect(results).to.have.property('meta');
      expect(results.meta).to.have.property('params');
    });
  });
  describe('Email Verification', () => {
    it('should verify email', async () => {
      const hunterio = new Hunterio(API_KEY);
      const verifyEmailRequest: VerifyEmailRequest = {
        email: 'alexleventer@gmail.com',
      };
      const results = await hunterio.verifyEmail(verifyEmailRequest);
      expect(results).to.have.property('data');
      expect(results.data).to.have.property('result');
      expect(results.data).to.have.property('score');
      expect(results.data).to.have.property('email');
      expect(results.data).to.have.property('regexp');
      expect(results.data).to.have.property('gibberish');
      expect(results).to.have.property('meta');
    });
  });
  describe('Email Count', () => {
    it('should get email count', async () => {
      const hunterio = new Hunterio(API_KEY);
      const emailCountRequest: EmailCountRequest = {
        domain: 'hunter.io',
      };
      const results:EmailCountResponse = await hunterio.getEmailCount(emailCountRequest);
      expect(results).to.have.property('data');
      expect(results.data).to.have.property('total');
      expect(results.data).to.have.property('personal_emails');
      expect(results.data).to.have.property('generic_emails');
      expect(results.data).to.have.property('department');
    });
  });
  describe('Leads Lists', () => {
    const hunterio = new Hunterio(API_KEY);
    it('should list leads lists', async () => {
      const results = await hunterio.listLeadsLists();
      expect(results).to.have.property('data');
      expect(results.data).to.have.property('leads_lists');
    });
  });
  describe('Leads', () => {
    const hunterio = new Hunterio(API_KEY);
    it('should list leads', async () => {
      const results = await hunterio.listLeads();
      expect(results).to.have.property('data');
      expect(results.data).to.have.property('leads');
    });
  });
});
