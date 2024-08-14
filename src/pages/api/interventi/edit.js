import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);
    
  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'PUT') {
    const { id } = req.query;
    const { 
      nome, 
      dataPresumibileInizio, 
      dataPresumibileFine, 
      tipologia, 
      azienda, 
      costo,
      edificio,
      scala,
      garage,
      postoAuto,
      proprietario,
      affittuario,
      tipoIntervento // Nuovo campo aggiunto per tipo di intervento
    } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db('Users_form_registration');
      const result = await db.collection('interventi').findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            nome,
            dataPresumibileInizio,
            dataPresumibileFine,
            tipologia,
            azienda,
            costo,
            edificio,
            scala,
            garage,
            postoAuto,
            proprietario,
            affittuario,
            tipoIntervento // Aggiornamento con il tipo di intervento
          }
        },
        { returnDocument: 'after' } // Restituisce il documento aggiornato
      );

      if (!result.value) {
        return res.status(404).json({ message: 'Intervento non trovato' });
      }

      return res.status(200).json(result.value);
    } catch (error) {
      console.error('Errore nell\'aggiornamento dell\'intervento:', error);
      return res.status(500).json({ message: 'Errore nell\'aggiornamento dell\'intervento', error });
    }
  } else {
    return res.status(405).json({ message: 'Metodo non consentito' });
  }
};
