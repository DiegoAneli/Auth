'use client';

import { useState, useEffect } from 'react';
import Dashboard from './index';

const CondoRegulationPage = () => {
  const [activeTab, setActiveTab] = useState('regulation');
  const [regulation, setRegulation] = useState('');
  const [civilCode, setCivilCode] = useState('');

  // Simulazione del recupero dei contenuti dal server
  useEffect(() => {
    // Recupera il regolamento condominiale
    const fetchRegulation = async () => {
      const storedRegulation = `Regolamento Condominiale

      1. Introduzione
      Questo regolamento stabilisce le norme che regolano la vita condominiale...

      2. Norme Generali
      a. Silenzio: Il silenzio deve essere rispettato dalle 22:00 alle 07:00...
      b. Utilizzo delle Aree Comuni: Le aree comuni devono essere mantenute pulite...

      3. Conclusione
      Il rispetto di questo regolamento è essenziale per una convivenza pacifica.`;
      setRegulation(storedRegulation);
    };

    // Recupera il codice civile
    const fetchCivilCode = async () => {
      const storedCivilCode = `Codice Civile

    Codice Civile: Nuovo codice del condominio (art.1117 – 1138 / 2659 / art. 61-74 / art. 155-156)
NUOVO CODICE DEL CONDOMINIO
(modificato con il DL Destinazione Italia)

«Art. 1117. (Parti comuni dell’edificio).

Sono oggetto di proprietà comune dei proprietari delle singole unità immobiliari dell’edificio, anche se aventi diritto a godimento periodico e se non risulta il contrario dal titolo:

tutte le parti dell’edificio necessarie all’uso comune, come il suolo su cui sorge l’edificio, le fondazioni, i muri maestri, i pilastri e le travi portanti, i tetti e i lastrici solari, le scale, i portoni di ingresso, i vestiboli, gli anditi, i portici, i cortili e le facciate;
le aree destinate a parcheggio nonché i locali per i servizi in comune, come la portineria, incluso l’alloggio del portiere, la lavanderia, gli stenditoi e i sottotetti destinati, per le caratteristiche strutturali e funzionali, all’uso comune;
le opere, le installazioni, i manufatti di qualunque genere destinati all’uso comune, come gli ascensori, i pozzi, le cisterne, gli impianti idrici e fognari, i sistemi centralizzati di distribuzione e di trasmissione per il gas, per l’energia elettrica, per il riscaldamento ed il condizionamento dell’aria, per la ricezione radiotelevisiva e per l’accesso a qualunque altro genere di flusso informativo, anche da satellite o via cavo, e i relativi collegamenti fino al punto di diramazione ai locali di proprietà individuale dei singoli condomini, ovvero, in caso di impianti unitari, fino al punto di utenza, salvo quanto disposto dalle normative di settore in materia di reti pubbliche». 
«Art. 1117-bis. (Ambito di applicabilità).

Le disposizioni del presente capo si applicano, in quanto compatibili, in tutti i casi in cui più unità immobiliari o più edifici ovvero più condominii di unità immobiliari o di edifici abbiano parti comuni ai sensi dell’articolo 1117.

Art. 1117-ter. (Modificazioni delle destinazioni d’uso).

Per soddisfare esigenze di interesse condominiale, l’assemblea, con un numero di voti che rappresenti i quattro quinti dei partecipanti al condominio e i quattro quinti del valore dell’edificio, può modificare la destinazione d’uso delle parti comuni.

La convocazione dell’assemblea deve essere affissa per non meno di trenta giorni consecutivi nei locali di maggior uso comune o negli spazi a tal fine destinati e deve effettuarsi mediante lettera raccomandata o equipollenti mezzi telematici, in modo da pervenire almeno venti giorni prima della data di convocazione.

La convocazione dell’assemblea, a pena di nullità, deve indicare le parti comuni oggetto della modificazione e la nuova destinazione d’uso.

La deliberazione deve contenere la dichiarazione espressa che sono stati effettuati gli adempimenti di cui ai precedenti commi.

Sono vietate le modificazioni delle destinazioni d’uso che possono recare pregiudizio alla stabilità o alla sicurezza del fabbricato o che ne alterano il decoro architettonico.

Art. 1117-quater. (Tutela delle destinazioni d’uso).

In caso di attività che incidono negativamente e in modo sostanziale sulle destinazioni d’uso delle parti comuni, l’amministratore o i condomini, anche singolarmente, possono diffidare l’esecutore e possono chiedere la convocazione dell’assemblea per far cessare la violazione, anche mediante azioni giudiziarie. L’assemblea delibera in merito alla cessazione di tali attività con la maggioranza prevista dal secondo comma dell’articolo 1136».

«Art. 1118. (Diritti dei partecipanti sulle parti comuni).

Il diritto di ciascun condomino sulle parti comuni, salvo che il titolo non disponga altrimenti, è proporzionale al valore dell’unità immobiliare che gli appartiene.

Il condomino non può rinunziare al suo diritto sulle parti comuni.

Il condomino non può sottrarsi all’obbligo di contribuire alle spese per la conservazione delle parti comuni, neanche modificando la destinazione d’uso della propria unità

immobiliare, salvo quanto disposto da leggi speciali.

Il condomino può rinunciare all’utilizzo dell’impianto centralizzato di riscaldamento o di condizionamento, se dal suo distacco non derivano notevoli squilibri di funzionamento o

aggravi di spesa per gli altri condomini. In tal caso il rinunziante resta tenuto a concorrere

al pagamento delle sole spese per la manutenzione straordinaria dell’impianto e per la sua conservazione e messa a norma».

Art.1119. (Indivisibilità).

Le parti comuni dell’edificio non sono soggette a divisione, a meno che la divisione possa farsi senza rendere più incomodo l’uso della cosa a ciascun condomino e con il consenso di tutti i partecipanti al condominio (1112, 1138; 61, 62 att.).

Art.1120. (Innovazioni)

I condomini, con la maggioranza indicata dal quinto comma dell’art. 1136, possono disporre tutte le innovazioni dirette al miglioramento o all’uso più comodo o al maggior rendimento delle cose comuni (1108).«I condomini, con la maggioranza indicata dal secondo comma dell’articolo 1136, possono disporre le innovazioni che, nel rispetto della normativa di settore, hanno ad oggetto:

le opere e gli interventi volti a migliorare la sicurezza e la salubrità degli edifici e degli impianti;
le opere e gli interventi previsti per eliminare le barriere architettoniche, per realizzare parcheggi destinati a servizio delle unità immobiliari o dell’edificio, nonché per la produzione di energia mediante l’utilizzo di impianti di cogenerazione, fonti eoliche, solari o comunque rinnovabili da parte del condominio o di terzi che conseguano a titolo oneroso un diritto reale o personale di godimento del lastrico solare o di altra idonea superficie comune;
l’installazione di impianti centralizzati per la ricezione radiotelevisiva e per l’accesso a qualunque altro genere di flusso informativo, anche da satellite o via cavo, e i relativi collegamenti fino alla diramazione per le singole utenze, ad esclusione degli impianti che non comportano modifiche in grado di alterare la destinazione della cosa comune e di impedire agli altri condomini di farne uso secondo il loro diritto.
L’amministratore è tenuto a convocare l’assemblea entro trenta giorni dalla richiesta anche di un solo condomino interessato all’adozione delle deliberazioni di cui al precedente comma. La richiesta deve contenere l’indicazione del contenuto specifico e delle modalità di esecuzione degli interventi proposti. In mancanza, l’amministratore deve invitare senza indugio il condomino proponente a fornire le necessarie integrazioni»

Sono vietate le innovazioni che possono recare pregiudizio alla stabilità o alla sicurezza del fabbricato, che ne alterino il decoro architettonico o che rendano talune parti comuni dell’edificio (1117) inservibili all’uso o al godimento anche di un solo condomino (1108, 1121, 1123, 1136, 1138).

Art.1121. (Innovazioni gravose o voluttuarie).

Qualora l’innovazione importi una spesa molto gravosa o abbia carattere voluttuario rispetto alle particolari condizioni e all’importanza dell’edificio, e consista in opere, impianti o manufatti suscettibili di utilizzazione separata, i condomini che non intendono trarne vantaggio sono esonerati da qualsiasi contributo nella spesa.

«Art. 1122. (Opere su parti di proprietà o uso individuale).

Nell’unita’ immobiliare di sua proprietà ovvero nelle parti normalmente destinate all’uso comune, che siano state attribuite in proprietà esclusiva o destinate all’uso individuale, il condomino non può eseguire opere che rechino danno alle parti comuni ovvero determinino pregiudizio alla stabilità, alla sicurezza o al decoro architettonico dell’edificio. In ogni caso è data preventiva notizia all’amministratore che ne riferisce all’assemblea.

«Art. 1122-bis. (Impianti non centralizzati di ricezione radiotelevisiva e di produzione di energia da fonti rinnovabili)

Le installazioni di impianti non centralizzati per la ricezione radiotelevisiva e per l’accesso a qualunque altro genere di flusso informativo, anche da satellite o via cavo, e i relativi collegamenti fino al punto di diramazione per le singole utenze sono realizzati in modo da recare il minor pregiudizio alle parti comuni e alle unità immobiliari di proprietà individuale, preservando in ogni caso il decoro architettonico dell’edificio, salvo quanto previsto in materia di reti pubbliche.

E’ consentita l’installazione di impianti per la produzione di energia da fonti rinnovabili destinati al servizio di singole unità del condominio sul lastrico solare, su ogni altra idonea superficie comune e sulle parti di proprietà individuale dell’interessato.

Qualora si rendano necessarie modificazioni delle parti comuni, l’interessato ne da’ comunicazione all’amministratore indicando il contenuto specifico e le modalità di esecuzione degli interventi.

L’assemblea può prescrivere, con la maggioranza di cui al quinto comma dell’articolo 1136, adeguate modalità alternative di esecuzione o imporre cautele a salvaguardia della stabilità, della sicurezza o del decoro architettonico dell’edificio e, ai fini dell’installazione degli impianti di cui al secondo comma, provvede, a richiesta degli interessati, a ripartire l’uso del lastrico solare e delle altre superfici comuni, salvaguardando le diverse forme di utilizzo previste dal regolamento di condominio o comunque in atto.

L’assemblea, con la medesima maggioranza, può altresì subordinare l’esecuzione alla prestazione, da parte dell’interessato, di idonea garanzia per i danni eventuali.

L’accesso alle unità immobiliari di proprietà individuale deve essere consentito ove necessario per la progettazione e per l’esecuzione delle opere. Non sono soggetti ad autorizzazione gli impianti destinati alle singole unità abitative.

Art. 1122-ter. (Impianti di videosorveglianza sulle parti comuni).

Le deliberazioni concernenti l’installazione sulle parti comuni dell’edificio di impianti volti a consentire la videosorveglianza su di esse sono approvate dall’assemblea con la maggioranza di cui al secondo comma dell’articolo 1136.

Art.1123. (Ripartizione delle spese).

Le spese necessarie per la conservazione e per il godimento delle parti comuni (1117, 1130, n. 3) dell’edificio, per la prestazione dei servizi nell’interesse comune e per le innovazioni deliberate dalla maggioranza sono sostenute dai condomini in misura proporzionale al valore della proprietà di ciascuno, salvo diversa convenzione (1101, 1104, 1118).

Se si tratta di cose destinate a servire i condomini in misura diversa, le spese sono ripartite in proporzione dell’uso che ciascuno può farne.

Qualora un edificio abbia più scale, cortili, lastrici solari, opere o impianti destinati a servire una parte dell’intero fabbricato, le spese relative alla loro manutenzione sono a carico del gruppo di condomini che ne trae utilità (1134, 1135; 63, 68, 69 att.).

Art. 1124 (Manutenzione e sostituzione delle scale e degli ascensori)

«Le scale e gli ascensori sono mantenuti e sostituiti dai proprietari delle unità immobiliari a cui servono. La spesa relativa è ripartita tra essi, per metà in ragione del valore delle singole unità immobiliari e per l’altra metà esclusivamente in misura proporzionale all’altezza di ciascun piano dal suolo.Al fine del concorso nella metà della spesa, che è ripartita in ragione del valore, si considerano come piani le cantine, i palchi morti, le soffitte o camere a tetto e i lastrici solari, qualora non siano di proprietà comune (68, 69 att.).

Art.1125. (Manutenzione e ricostruzione dei soffitti, delle volte e dei solai).

Le spese per la manutenzione e ricostruzione dei soffitti, delle volte e dei solai sono sostenute in parti eguali dai proprietari dei due piani l’uno all’altro sovrastanti, restando a carico del proprietario del piano superiore la copertura del pavimento e a carico del proprietario del piano inferiore l’intonaco, la tinta e la decorazione del soffitto.

Art.1126. (Lastrici solari ad uso esclusivo).

Quando l’uso dei lastrici solari o di una parte di essi non è comune a tutti i condomini, quelli che ne hanno l’uso esclusivo sono tenuti a contribuire per un terzo nella spesa delle riparazioni o ricostruzioni del lastrico: gli altri due terzi sono a carico di tutti i condomini dell’edificio o della parte di questo a cui il lastrico solare serve, in proporzione del valore del piano o della porzione di piano di ciascuno (68, 69 att.).

Art.1127. (Costruzione sopra l’ultimo piano dell’edificio).

Il proprietario dell’ultimo piano dell’edificio può elevare nuovi piani o nuove fabbriche, salvo che risulti altrimenti dal titolo (885). La stessa facoltà spetta a chi è proprietario esclusivo del lastrico solare.

La sopraelevazione non è ammessa se le condizioni statiche dell’edificio non la consentono.

I condomini possono altresì opporsi alla sopraelevazione, se questa pregiudica l’aspetto architettonico dell’edificio ovvero diminuisce notevolmente l’aria o la luce dei piani sottostanti.

Chi fa la sopraelevazione deve corrispondere agli altri condomini un’indennità pari al valore attuale dell’area da occuparsi con la nuova fabbrica, diviso per numero dei piani, ivi compreso quello da edificare, e detratto l’importo della quota a lui spettante. Egli è inoltre tenuto a ricostruire il lastrico solare di cui tutti o parte dei condomini avevano il diritto di usare.

Art.1128. (Perimento totale o parziale dell’edificio).

Se l’edificio perisce interamente o per una parte che rappresenti i tre quarti del suo valore, ciascuno dei condomini può richiedere la vendita all’asta del suolo e dei materiali, salvo che sia stato diversamente convenuto.

Nel caso di perimento di una parte minore, l’assemblea dei condomini delibera circa la ricostruzione delle parti comuni dell’edificio (1117, 1136), e ciascuno è tenuto a concorrervi in proporzione dei suoi diritti sulle parti stesse (1127).

L’indennità corrisposta per l’assicurazione relativa alle parti comuni è destinata alla ricostruzione di queste (1882).

Il condomino che non intende partecipare alla ricostruzione dell’edificio è tenuto a cedere agli altri condomini i suoi diritti, anche sulle parti di sua esclusiva proprietà, secondo la stima che ne sarà fatta, salvo che non preferisca cedere i diritti stessi ad alcuni soltanto dei condomini (2932)

«Art. 1129. (Nomina, revoca ed obblighi dell’amministratore)

Quando i condomini sono più di otto, se l’assemblea non vi provvede, la nomina di un amministratore è fatta dall’autorità giudiziaria su ricorso di uno o più condomini o dell’amministratore dimissionario.

Contestualmente all’accettazione della nomina e ad ogni rinnovo dell’incarico, l’amministratore comunica i propri dati anagrafici e professionali, il codice fiscale, o, se si tratta di società, anche la sede legale e la denominazione, il locale ove si trovano i registri di cui ai numeri 6) e 7) dell’articolo 1130, nonché i giorni e le ore in cui ogni interessato, previa richiesta all’amministratore, può prenderne gratuitamente visione e ottenere, previo rimborso della spesa, copia da lui firmata.

L’assemblea può subordinare la nomina dell’amministratore alla presentazione ai condomini di una polizza individuale di assicurazione per la responsabilità civile per gli atti compiuti nell’esercizio del mandato.

L’amministratore è tenuto altresì ad adeguare i massimali della polizza se nel periodo del suo incarico l’assemblea deliberi lavori straordinari. Tale adeguamento non deve essere inferiore all’importo di spesa deliberato e deve essere effettuato contestualmente all’inizio dei lavori. Nel caso in cui l’amministratore sia coperto da una polizza di assicurazione per la responsabilità civile professionale generale per l’intera attività da lui svolta, tale polizza deve essere integrata con una dichiarazione dell’impresa di assicurazione che garantisca le condizioni previste dal periodo precedente per lo specifico condominio.

Sul luogo di accesso al condominio o di maggior uso comune, accessibile anche ai terzi, è affissa l’indicazione delle generalità, del domicilio e dei recapiti, anche telefonici, dell’amministratore.

In mancanza dell’amministratore, sul luogo di accesso al condominio o di maggior uso comune, accessibile anche ai terzi, è affissa l’indicazione delle generalità e dei recapiti, anche telefonici, della persona che svolge funzioni analoghe a quelle dell’amministratore. L’amministratore è obbligato a far transitare le somme ricevute a qualunque titolo dai condomini o da terzi, nonché quelle a qualsiasi titolo erogate per conto del condominio, su uno specifico conto corrente, postale o bancario, intestato al condominio; ciascun condomino, per il tramite dell’amministratore, può chiedere di prendere visione ed estrarre copia, a proprie spese, della rendicontazione periodica.

Alla cessazione dell’incarico l’amministratore è tenuto alla consegna di tutta la documentazione in suo possesso afferente al condominio e ai singoli condomini e ad eseguire le attività urgenti al fine di evitare pregiudizi agli interessi comuni senza diritto ad ulteriori compensi.

Salvo che sia stato espressamente dispensato dall’assemblea, l’amministratore è tenuto ad agire per la riscossione forzosa delle somme dovute dagli obbligati entro sei mesi dalla chiusura dell’esercizio nel quale il credito esigibile è compreso, anche ai sensi dell’articolo 63, primo comma, delle disposizioni per l’attuazione del presente codice.

L’incarico di amministratore ha durata di un anno e si intende rinnovato per eguale durata. L’assemblea convocata per la revoca o le dimissioni delibera in ordine alla nomina del nuovo amministratore.

La revoca dell’amministratore può essere deliberata in ogni tempo dall’assemblea, con la maggioranza prevista per la sua nomina oppure con le modalità previste dal regolamento di condominio. Può altresì essere disposta dall’autorità giudiziaria, su ricorso di ciascun condomino, nel caso previsto dal quarto comma dell’articolo 1131, se non rende il conto della gestione, ovvero in caso di gravi irregolarità. Nei casi in cui siano emerse gravi irregolarità fiscali o di non ottemperanza a quanto disposto dal numero 3) del dodicesimo comma del presente articolo, i condomini, anche singolarmente, possono chiedere la convocazione dell’assemblea per far cessare la violazione e revocare il mandato all’amministratore.

In caso di mancata revoca da parte dell’assemblea, ciascun condomino può rivolgersi all’autorità giudiziaria; in caso di accoglimento della domanda, il ricorrente, per le spese legali, ha titolo alla rivalsa nei confronti del condominio, che a sua volta può rivalersi nei confronti dell’amministratore revocato. Costituiscono, tra le altre, gravi irregolarità:

l’omessa convocazione dell’assemblea per l’approvazione del rendiconto condominiale, il ripetuto rifiuto di convocare l’assemblea per la revoca e per la nomina del nuovo amministratore o negli altri casi previsti dalla legge;
la mancata esecuzione di provvedimenti giudiziari e amministrativi, nonché di deliberazioni dell’assemblea;
la mancata apertura ed utilizzazione del conto di cui al settimo comma;
la gestione secondo modalità che possono generare possibilità di confusione tra il patrimonio del condominio e il patrimonio personale dell’amministratore o di altri condomini;
l’aver acconsentito, per un credito insoddisfatto, alla cancellazione delle formalità eseguite nei registri immobiliari a tutela dei diritti del condominio;
qualora sia stata promossa azione giudiziaria per la riscossione delle somme dovute al condominio, l’aver omesso di curare diligentemente l’azione e la conseguente esecuzione coattiva;
l’inottemperanza agli obblighi di cui all’articolo 1130, numeri 6), 7) e 9); 8) l’omessa, incompleta o inesatta comunicazione dei dati di cui al secondo comma del presente articolo.
In caso di revoca da parte dell’autorità giudiziaria, l’assemblea non può nominare nuovamente l’amministratore revocato.

L’amministratore, all’atto dell’accettazione della nomina e del suo rinnovo, deve specificare analiticamente, a pena di nullità della nomina stessa, l’importo dovuto a titolo di compenso per l’attività svolta.

Per quanto non disciplinato dal presente articolo si applicano le disposizioni di cui alla sezione I del capo IX del titolo III del libro IV.

Il presente articolo si applica anche agli edifici di alloggi di edilizia popolare ed economica, realizzati o recuperati da enti pubblici a totale partecipazione pubblica o con il concorso dello Stato, delle regioni, delle province o dei comuni, nonché a quelli realizzati da enti pubblici non economici o società private senza scopo di lucro con finalità sociali proprie dell’edilizia residenziale pubblica».

«Art. 1130. (Attribuzioni dell’amministratore).

L’amministratore, oltre a quanto previsto dall’articolo 1129 e dalle vigenti disposizioni di legge, deve:

eseguire le deliberazioni dell’assemblea, convocarla annualmente per l’approvazione del rendiconto condominiale di cui all’articolo 1130-bis e curare l’osservanza del regolamento di condominio;
disciplinare l’uso delle cose comuni e la fruizione dei servizi nell’interesse comune, in modo che ne sia assicurato il miglior godimento a ciascuno dei condomini;
riscuotere i contributi ed erogare le spese occorrenti per la manutenzione ordinaria delle parti comuni dell’edificio e per l’esercizio dei servizi comuni;
compiere gli atti conservativi relativi alle parti comuni dell’edificio;
eseguire gli adempimenti fiscali;
curare la tenuta del registro di anagrafe condominiale contenente le generalità dei singoli proprietari e dei titolari di diritti reali e di diritti personali di godimento, comprensive del codice fiscale e della residenza o domicilio, i dati catastali di ciascuna unità immobiliare, nonché ogni dato relativo alle condizioni di sicurezza delle parti comuni dell’edificio. Ogni variazione dei dati deve essere comunicata all’amministratore in forma scritta entro sessanta giorni. L’amministratore, in caso di inerzia, mancanza o incompletezza delle comunicazioni, richiede con lettera raccomandata le informazioni necessarie alla tenuta del registro di anagrafe. Decorsi trenta giorni, in caso di omessa o incompleta risposta, l’amministratore acquisisce le informazioni necessarie, addebitandone il costo ai responsabili;
curare la tenuta del registro dei verbali delle assemblee, del registro di nomina e revoca dell’amministratore e del registro di contabilità. Nel registro dei verbali delle assemblee sono altresì annotate: le eventuali mancate costituzioni dell’assemblea, le deliberazioni nonché le brevi dichiarazioni rese dai condomini che ne hanno fatto richiesta; allo stesso registro è allegato il regolamento di condominio, ove adottato. Nel registro di nomina e revoca dell’amministratore sono annotate, in ordine cronologico, le date della nomina e della revoca di ciascun amministratore del condominio, nonché gli estremi del decreto in caso di provvedimento giudiziale. Nel registro di contabilità sono annotati in ordine cronologico, entro trenta giorni da quello dell’effettuazione, i singoli movimenti in entrata ed in uscita. Tale registro può tenersi anche con modalità informatizzate;
conservare tutta la documentazione inerente alla propria gestione riferibile sia al rapporto con i condomini sia allo stato tecnico-amministrativo dell’edificio e del condominio;
fornire al condomino che ne faccia richiesta attestazione relativa allo stato dei pagamenti degli oneri condominiali e delle eventuali liti in corso;
10. redigere il rendiconto condominiale annuale della gestione e convocare l’assemblea per la relativa approvazione entro centottanta giorni».

«Art. 1130-bis. (Rendiconto condominiale).

Il rendiconto condominiale contiene le voci di entrata e di uscita ed ogni altro dato  inerente alla situazione patrimoniale del condominio, ai fondi disponibili ed alle eventuali riserve, che devono essere espressi in modo da consentire l’immediata verifica. Si  compone di un registro di contabilità, di un riepilogo finanziario, nonché di una nota sintetica esplicativa della gestione con l’indicazione anche dei rapporti in corso e delle questioni pendenti. L’assemblea condominiale può, in qualsiasi momento o per più annualità specificamente identificate, nominare un revisore che verifichi la contabilità del condominio. La deliberazione è assunta con la maggioranza prevista per la nomina dell’amministratore e la relativa spesa è ripartita fra tutti i condomini sulla base dei millesimi di proprietà. I condomini e i titolari di diritti reali o di godimento sulle unità immobiliari possono prendere visione dei documenti giustificativi di spesa in ogni tempo ed estrarne copia a proprie spese. Le scritture e i documenti giustificativi devono essere conservati per dieci anni dalla data della relativa registrazione.

L’assemblea può anche nominare, oltre all’amministratore, un consiglio di condominio composto da almeno tre condomini negli edifici di almeno dodici unità immobiliari. Il consiglio ha funzioni consultive e di controllo».

Art.1131. (Rappresentanza).

Nei limiti delle attribuzioni stabilite dall’articolo 1130 dai maggiori poteri conferitigli dal regolamento di condominio o dall’assemblea, l’amministratore ha la rappresentanza dei partecipanti e può agire in giudizio sia contro i condomini sia contro i terzi (1135, 1138).

Può essere convenuto in giudizio per qualunque azione concernente le parti comuni dell’edificio (1117); a lui sono notificati i provvedimenti dell’autorità amministrativa che si riferiscono allo stesso oggetto.

Qualora la citazione o il provvedimento abbia un contenuto che esorbita dalle attribuzioni dell’amministratore, questi è tenuto a darne senza indugio notizia all’assemblea dei condomini (1136).

L’amministratore che non adempie a quest’obbligo può essere revocato (1129) ed è tenuto al

risarcimento dei danni (1138; 64, 65 att.).

Art.1132. (Dissenso dei condomini rispetto alle liti).

Qualora l’assemblea dei condomini abbia deliberato di promuovere una lite o di resistere a una domanda (1131, 1136 ; 65 att.), il condoniino dissenziente, con atto notificato (137 c.p.c.) all’amministratore, può separare la propria responsabilità in ordine alle conseguenze della lite per il caso di soccombenza. L’atto deve essere notificato entro trenta giorni da quello in cui il condominio ha avuto notizia della deliberazione.

Il condominio dissenziente ha diritto di rivalsa per ciò che abbia dovuto pagare alla parte vittoriosa. Se l’esito della lite è stato favorevole al condominio, il condomino dissenziente che ne abbia tratto vantaggio è tenuto a concorrere nelle spese del giudizio che non sia stato possibile ripetere dalla parte soccombente (1138; 90 ss. c.p.c.).

Art.1133. (Provvedimenti presi dall’amministratore).

I provvedimenti presi dall’amministratore nell’ambito dei suoi poteri sono obbligatori per i condomini (1130, 1131). Contro i provvedimenti dell’amministratore è ammesso ricorso all’assemblea, senza pregiudizio del ricorso all’autorità giudiziaria nei casi e nel termine previste dall’articolo 1137.

«Art. 1134. (Gestione di iniziativa individuale).

Il condomino che ha assunto la gestione delle parti comuni senza autorizzazione dell’amministratore o dell’assemblea non ha diritto al rimborso, salvo che si tratti di spesa urgente».

Art.1135. (Attribuzioni dell’assemblea dei condomini).

Oltre a quanto è stabilito dagli articoli precedenti, l’assemblea dei condomini provvede (66, 67 att.):

alla conferma dell’amministratore e all’eventuale sua retribuzione (1129);
all’approvazione del preventivo delle spese occorrenti durante l’anno e alla relativa ripartizione tra i condomini (1123);
all’approvazione del rendiconto annuale dell’amministratore e all’impiego del residuo attivo della gestione (1130) 
4) alle opere di manutenzione straordinaria e alle innovazioni, costituendo obbligatoriamente un fondo speciale di importo pari all’ammontare dei lavori;se i lavori devono essere eseguiti in base a un contratto che prevede il pagamento graduale in funzione del loro progressivo stato di avanzamento, il fondo può essere costituito in relazione ai singoli pagamenti dovuti

«L’assemblea può autorizzare l’amministratore a partecipare e collaborare a progetti, programmi e iniziative territoriali promossi dalle istituzioni locali o da soggetti privati qualificati, anche mediante opere di risanamento di parti comuni degli immobili nonché di demolizione, ricostruzione e messa in sicurezza statica, al fine di favorire il recupero del patrimonio edilizio esistente, la vivibilità urbana, la sicurezza e la sostenibilità ambientale della zona in cui il condominio è ubicato».

L’amministratore  non  può  ordinare  lavori  di  manutenzione  straordinaria,  salvo  che  rivestano carattere urgente, ma in questo caso deve riferirne nella prima assemblea (1134).

«Art. 1136. (Costituzione dell’assemblea e validità delle deliberazioni).

L’assemblea in prima convocazione è regolarmente costituita con l’intervento di tanti condomini che rappresentino i due terzi del valore dell’intero edificio e la maggioranza dei partecipanti al condominio.

Sono valide le deliberazioni approvate con un numero di voti che rappresenti la maggioranza degli intervenuti e almeno la metà del valore dell’edificio.

Se l’assemblea in prima convocazione non può deliberare per mancanza di numero legale, l’assemblea in seconda convocazione delibera in un giorno successivo a quello della prima e, in ogni caso, non oltre dieci giorni dalla medesima. L’assemblea in seconda convocazione è regolarmente costituita con l’intervento di tanti condomini che rappresentino almeno un terzo del valore dell’intero edificio e un terzo dei partecipanti al condominio. La deliberazione è valida se approvata dalla maggioranza degli intervenuti con un numero di voti che rappresenti almeno un terzo del valore dell’edificio.

Le deliberazioni che concernono la nomina e la revoca dell’amministratore o le liti attive e passive relative a materie che esorbitano dalle attribuzioni dell’amministratore medesimo, le deliberazioni che concernono la ricostruzione dell’edificio o riparazioni straordinarie di notevole entità e le deliberazioni di cui agli articoli 1117-quater, 1120, secondo comma, 1122-ter nonché 1135, terzo comma, devono essere sempre approvate con la maggioranza stabilita dal secondo comma del presente articolo.

Le deliberazioni di cui all’articolo 1120, primo comma, e all’articolo 1122-bis, terzo comma, devono essere approvate dall’assemblea con un numero di voti che rappresenti la maggioranza degli intervenuti ed almeno i due terzi del valore dell’edificio.

L’assemblea non può deliberare, se non consta che tutti gli aventi diritto sono stati regolarmente convocati.

Delle riunioni dell’assemblea si redige processo verbale da trascrivere nel registro tenuto dall’amministratore».

«Art. 1137. (Impugnazione delle deliberazioni dell’assemblea)

Le deliberazioni prese dall’assemblea a norma degli articoli precedenti sono obbligatorie per tutti i condomini.
Contro le deliberazioni contrarie alla legge o al regolamento di condominio ogni condomino assente, dissenziente o astenuto può adire l’autorità giudiziaria chiedendone l’annullamento nel termine perentorio di trenta giorni, che decorre dalla data della deliberazione per i dissenzienti o astenuti e dalla data di comunicazione della deliberazione per gli assenti.

L’azione di annullamento non sospende l’esecuzione della deliberazione, salvo che la sospensione sia ordinata dall’autorità giudiziaria.

L’istanza per ottenere la sospensione proposta prima dell’inizio della causa di merito non sospende né interrompe il termine per la proposizione dell’impugnazione della deliberazione. Per quanto non espressamente previsto, la sospensione è disciplinata dalle norme di cui al libro IV, titolo I, capo III, sezione I, con l’esclusione dell’articolo 669- octies, sesto comma, del codice di procedura civile».

Art.1138. (Regolamento di condominio).

Quando in un edificio il numero dei condomini è superiore a dieci, deve essere formato un regolamento, il quale contenga le norme circa l’uso delle cose comuni (1117) e la ripartizione delle spese (1123), secondo i diritti e gli obblighi spettanti a ciascun condomino, nonché le norme per la tutela del decoro dell’edificio e quelle relative all’amministrazione (1106; 68, 70, 72 att.).Ciascun condomino può prendere l’iniziativa per la formazione del regolamento di condominio o per la revisione di quello esistente.

Il regolamento deve essere approvato dall’assemblea con la maggioranza stabilita dal secondo comma dell’articolo 1136 ed allegato al registro indicato dal numero 7) dell’articolo 1130. Esso può essere impugnato a norma dell’articolo 1107

Le norme del regolamento non possono in alcun modo menomare i diritti di ciascun condomino, quali risultano dagli atti di acquisto e dalle convenzioni, e in nessun caso possono derogare alle disposizioni degli articoli 1118, secondo comma, 1119, 1120, 1129, 1131, 1132, 1136 e 1137 (68, 70, 71, 72 att.).

Le norme del regolamento non possono vietare di possedere o detenere animali domestici

Art.1139. (Rinvio alle norme sulla comunione).

Per quanto non è espressamente previsto da questo capo si osservano le norme sulla comunione in generale (1100 ss; 61 ss. att.).

Art.2659

Chi domanda la trascrizione di un atto fra vivi deve presentare al conservatore dei registri immobiliari, insieme con la copia del titolo, una nota in doppio originale [2665], nella quale devono essere indicati [2669]:

1) il cognome ed il nome, il luogo e la data di nascita e il numero di codice fiscale delle parti, nonché il regime patrimoniale delle stesse, se coniugate [159], secondo quanto risulta da loro dichiarazione resa nel titolo o da certificato dell‘ufficiale di stato civile; la denominazione o la ragione sociale, la sede e il numero di codice fiscale delle persone giuridiche, delle società previste dai capi II, III e IV del titolo V del libro quinto e delle associazioni non riconosciute, con l’indicazione, per queste ultime e per le società semplici [2251], anche delle generalità delle persone che le rappresentano secondo l’atto costitutivo; Per i condominii devono essere indicati l’eventuale denominazione, l’ubicazione e il codice fiscale.

Sezione III – Disposizioni relative al libro III 

Art. 61

Qualora un edificio o un gruppo di edifici appartenenti per piani o porzione di piano a proprietari diversi si possa dividere in parti che abbiano le caratteristiche di edifici autonomi, il condominio può essere sciolto e i comproprietari di ciascuna parte possono costituirsi in condominio separato.

Lo scioglimento è deliberato dall’assemblea con la maggioranza prescritta dal secondo comma dell’art. 1136 del codice, o e’ disposto dall’autorità giudiziaria su domanda di almeno un terzo dei comproprietari di quella parte dell’edificio della quale si chiede la separazione.

Art. 62

La disposizione del primo comma dell’articolo precedente si applica anche se restano in comune con gli originari partecipanti alcune delle cose indicate dall’ art. 1117 del codice.

Qualora la divisione non possa attuarsi senza modificare lo stato delle cose e occorrano opere per la sistemazione diversa dei locali o delle dipendenze tra i condomini, lo scioglimento del condominio deve essere deliberato dall’assemblea con la maggioranza prescritta dal quinto comma dell’art. 1136 del codice stesso.

Art. 63

Per la riscossione dei contributi in base allo stato di ripartizione approvato dall’assemblea, l’amministratore, senza bisogno di autorizzazione di questa, può ottenere un decreto di ingiunzione immediatamente esecutivo, nonostante opposizione, ed è tenuto a comunicare ai creditori non ancora soddisfatti che lo interpellino i dati dei condomini morosi.

I creditori non possono agire nei confronti degli obbligati in regola con i pagamenti, se non dopo l’escussione degli altri condomini.

In caso di mora nel pagamento dei contributi che si sia protratta per un semestre, l’amministratore può sospendere il condomino moroso dalla fruizione dei servizi comuni suscettibili di godimento separato.

Chi subentra nei diritti di un condomino è obbligato solidalmente con questo al pagamento dei contributi relativi all’anno in corso e a quello precedente.

Chi cede diritti su unità immobiliari resta obbligato solidalmente con l’avente causa per i contributi maturati fino al momento in cui è trasmessa all’amministratore copia autentica del titolo che determina il trasferimento del diritto».

«Art. 64.

Sulla revoca dell’amministratore, nei casi indicati dall’undicesimo comma dell’articolo 1129 e dal quarto comma dell’articolo 1131 del codice, il tribunale provvede in camera di consiglio, con decreto motivato, sentito l’amministratore in contraddittorio con il ricorrente.

Contro il provvedimento del tribunale può essere proposto reclamo alla corte d’appello nel termine di dieci giorni dalla notificazione o dalla comunicazione». 

Art. 65

Quando per qualsiasi causa manca il legale rappresentante dei condomini, chi intende iniziare o proseguire una lite contro i partecipanti a un condominio puo’ richiedere la nomina di un curatore speciale ai sensi dell’ art. 80 del codice di procedura civile.

II curatore speciale deve senza indugio convocare I’assemblea dei condomini per avere istruzioni sulla condotta della lite.

Art. 66

L’assemblea, oltre che annualmente in via ordinaria per deliberazioni indicate dall’art. 1135 del codice, puo’ essere convocata in via straordinaria dall’ amministratore quando questi lo ritiene necessario o quando ne e’ fatta richiesta da almeno due condomini che rappresentino un sesto del valore dell’edificio. Decorsi inutilmente dieci giorni dalla richiesta, i detti condomini possono provvedere direttamente alla convocazione.

In mancanza dell’amministratore, l’assemblea tanto ordinaria quanto straordinaria può essere convocata a iniziativa di ciascun condomino.

«L’avviso di convocazione, contenente specifica indicazione dell’ordine del giorno, deve essere comunicato almeno cinque giorni prima della data fissata per l’adunanza in prima convocazione, a mezzo di posta raccomandata, posta elettronica certificata, fax o tramite consegna a mano, e deve contenere l’indicazione del luogo e dell’ora della riunione. In caso di omessa, tardiva o incompleta convocazione degli aventi diritto, la deliberazione assembleare e’ annullabile ai sensi dell’articolo 1137 del codice su istanza dei dissenzienti o assenti perché non ritualmente convocati.

L’assemblea in seconda convocazione non può tenersi nel medesimo giorno solare della prima.

L’amministratore ha facoltà di fissare più riunioni consecutive in modo da assicurare lo svolgimento dell’assemblea in termini brevi, convocando gli aventi diritto con un unico avviso nel quale sono indicate le ulteriori date ed ore di eventuale prosecuzione dell’assemblea validamente costituitasi».

«Art. 67. –

Ogni condomino può intervenire all’assemblea anche a mezzo di rappresentante, munito di delega scritta. Se i condomini sono più di venti, il delegato non può rappresentare più di  un quinto dei condomini e del valore proporzionale.

Qualora un’unità immobiliare appartenga in proprietà indivisa a più persone, queste hanno diritto a un solo rappresentante nell’assemblea, che è designato dai comproprietari interessati a norma dell’articolo 1106 del codice.

Nei casi di cui all’articolo 1117-bis del codice, quando i partecipanti sono complessivamente più di sessanta, ciascun condominio deve designare, con la maggioranza di cui all’articolo 1136, quinto comma, del codice, il proprio rappresentante all’assemblea per la gestione ordinaria delle parti comuni a più condominii e per la nomina dell’amministratore. In mancanza, ciascun partecipante può chiedere che l’autorità giudiziaria nomini il rappresentante del proprio condominio.

Qualora alcuni dei condominii interessati non abbiano nominato il proprio rappresentante, l’autorità giudiziaria provvede alla nomina su ricorso anche di uno solo dei rappresentanti già nominati, previa diffida a provvedervi entro un congruo termine. La diffida ed il ricorso all’autorità giudiziaria sono notificati al condominio cui si riferiscono in persona dell’amministratore o, in mancanza, a tutti i condomini.

Ogni limite o condizione al potere di rappresentanza si considera non apposto. Il rappresentante risponde con le regole del mandato e comunica tempestivamente all’amministratore di ciascun condominio l’ordine del giorno e le decisioni assunte dall’assemblea dei rappresentanti dei condominii. L’amministratore riferisce in assemblea. All’amministratore non possono essere conferite deleghe per la partecipazione a qualunque assemblea.

L’usufruttuario di un piano o porzione di piano dell’edificio esercita il diritto di voto negli affari che attengono all’ordinaria amministrazione e al semplice godimento delle cose e dei servizi comuni.

Nelle altre deliberazioni, il diritto di voto spetta ai proprietari, salvi i casi in cui l’usufruttuario intenda avvalersi del diritto di cui all’articolo 1006 del codice ovvero si tratti di lavori od opere ai sensi degli articoli 985 e 986 del codice. In tutti questi casi l’avviso di convocazione deve essere comunicato sia all’usufruttuario sia al nudo proprietario.

Il nudo proprietario e l’usufruttuario rispondono solidalmente per il pagamento dei contributi dovuti all’amministrazione condominiale».

«Art. 68. –

Ove non precisato dal titolo ai sensi dell’articolo 1118, per gli effetti indicati dagli articoli 1123, 1124, 1126 e 1136 del codice, il valore proporzionale di ciascuna unità immobiliare è espresso in millesimi in apposita tabella allegata al regolamento di condominio. Nell’accertamento dei valori di cui al primo comma non si tiene conto del canone locatizio, dei miglioramenti e dello stato di manutenzione di ciascuna unità immobiliare»

«Art. 69.

I valori proporzionali delle singole unità immobiliari espressi nella tabella millesimale di cui all’articolo 68 possono essere rettificati o modificati all’unanimità. Tali valori possono essere rettificati o modificati, anche nell’interesse di un solo condomino, con la maggioranza prevista dall’articolo 1136, secondo comma, del codice, nei seguenti casi:

quando risulta che sono conseguenza di un errore;
quando, per le mutate condizioni di una parte dell’edificio, in conseguenza di sopraelevazione, di incremento di superfici o di incremento o diminuzione delle unità immobiliari, è alterato per più di un quinto il valore proporzionale dell’unita’ immobiliare anche di un solo condomino. In tal caso il relativo costo è sostenuto da chi ha dato luogo alla variazione.
Ai soli fini della revisione dei valori proporzionali espressi nella tabella millesimale allegata al regolamento di condominio ai sensi dell’articolo 68, può essere convenuto in giudizio unicamente il condominio in persona dell’amministratore. Questi e’ tenuto a darne senza indugio notizia all’assemblea dei condomini.

L’amministratore che non adempie a quest’obbligo può essere revocato ed e’ tenuto al risarcimento degli eventuali danni.

Le norme di cui al presente articolo si applicano per la rettifica o la revisione delle tabelle per la ripartizione delle spese redatte in applicazione dei criteri legali o convenzionali».

«Art. 70. –

Per le infrazioni al regolamento di condominio può essere stabilito, a titolo di sanzione, ilpagamento di una somma fino ad euro 200 e, in caso di recidiva, fino ad euro 800. Lasomma è devoluta al fondo di cui l’amministratore dispone per le spese ordinarie.

L’irrorazione della sanzione è deliberata dall’ assemblea con le maggioranze di cui al  secondo comma dell’art .113 6  del Codice ».

Art. 71

Il registro indicato dal quarto comma dell’ art. 1129 e del terzo comma dell’art. 1138 del codice e’ tenuto presso I’ associazione professionale (1) dei proprietari di fabbricati.

(1) elinimata con il D.L.lg. 23/11/1944, n. 369

«Art. 71-bis.

Possono svolgere l’incarico di amministratore di condominio coloro:

a)   che hanno il godimento dei diritti civili;

b)   che non sono stati condannati per delitti contro la pubblica amministrazione, l’amministrazione della giustizia, la fede pubblica, il patrimonio o per ogni altro delitto non colposo per il quale la legge commina la pena della reclusione non inferiore, nel minimo, a due anni e, nel massimo, a cinque anni;

c)   che non sono stati sottoposti a misure di prevenzione divenute definitive, salvo che non sia intervenuta la riabilitazione;

d)   che non sono interdetti o inabilitati;

e)   il cui nome non risulta annotato nell’elenco dei protesti cambiari;

f)    che hanno conseguito il diploma di scuola secondaria di secondo grado;

g)   che hanno frequentato un corso di formazione iniziale e svolgono attività di formazione periodica in materia di amministrazione condominiale.

I requisiti di cui alle lettere f) e g) del primo comma non sono necessari qualora l’amministratore sia nominato tra i condomini dello stabile.

Possono svolgere l’incarico di amministratore di condominio anche società di cui al titolo V del libro V del codice. In tal caso, i requisiti devono essere posseduti dai soci illimitatamente responsabili, dagli amministratori e dai dipendenti incaricati di svolgere le funzioni di amministrazione dei condominii a favore dei quali la società presta i servizi.  La perdita dei requisiti di cui alle lettere a), b), c), d) ed e) del primo comma comporta la cessazione dall’incarico. In tale evenienza ciascun condomino può convocare senza formalità l’assemblea per la nomina del nuovo amministratore.

A quanti hanno svolto attività di amministrazione di condominio per almeno un anno, nell’arco dei tre anni precedenti alla data di entrata in vigore della presente disposizione, e’ consentito lo svolgimento dell’attività di amministratore anche in mancanza dei requisiti di cui alle lettere f) e g) del primo comma. Resta salvo l’obbligo di formazione periodica.

Art. 71-ter.

Su richiesta dell’assemblea, che delibera con la maggioranza di cui al secondo comma dell’articolo 1136 del codice, l’amministratore e’ tenuto ad attivare un sito internet del condominio che consenta agli aventi diritto di consultare ed estrarre copia in formato digitale dei documenti previsti dalla delibera assembleare. Le spese per l’attivazione e la gestione del sito internet sono poste a carico dei condomini.

Art. 71-quater.

Per controversie in materia di condominio, ai sensi dell’articolo 5, comma 1, del decreto legislativo 4 marzo 2010, n. 28, si intendono quelle derivanti dalla violazione o dall’errata applicazione delle disposizioni del libro III, titolo VII, capo II, del codice e degli articoli da 61 a 72 delle presenti disposizioni per l’attuazione del codice.

La domanda di mediazione deve essere presentata, a pena di inammissibilità, presso un organismo di mediazione ubicato nella circoscrizione del tribunale nella quale il condominio è situato.

Al procedimento è legittimato a partecipare l’amministratore, previa delibera assembleare da assumere con la maggioranza di cui all’articolo 1136, secondo comma, del codice.

Se i termini di comparizione davanti al mediatore non consentono di assumere la delibera di cui al terzo comma, il mediatore dispone, su istanza del condominio, idonea proroga della prima comparizione.

La proposta di mediazione deve essere approvata dall’assemblea con la maggioranza di cui all’articolo 1136, secondo comma, del codice.

Se non si raggiunge la predetta maggioranza, la proposta si deve intendere non accettata.

Il mediatore fissa il termine per la proposta di conciliazione di cui all’articolo 11 del decreto legislativo 4 marzo 2010, n. 28, tenendo conto della necessità per l’amministratore di munirsi della delibera assembleare».

Art. 72

I regolamenti di condominio non possono derogare alle disposizioni dei precedenti art. 63, 66, 67, e 69.

Art. 155 

Capo II – Disposizioni transitorie Sezione III – Disposizioni relative al Libro III

Le disposizioni concernenti la revisione dei regolamenti di condominio e la trascrizione di essi si applicano anche ai regolamenti formati prima del 28 ottobre 1941.Cessano di avere effetto le disposizioni dei regolamenti di condominio che siano contrarie alle norme richiamate nell’ultimo comma dell’art. 1138 del codice enell’art. 72 di queste disposizioni.

«Art. 155-bis. –

L’assemblea, ai fini dell’adeguamento degli impianti non centralizzati di cui a ll’articolo 1122-bis, primo comma, del codice, già esistenti alla data di entrata in vigore del predetto articolo, adotta le necessarie prescrizioni con le maggioranze di cui all’articolo 1136, commi primo, secondo e terzo, del codice».

Art. 156

 Capo II – Disposizioni transitorie Sezione III – Disposizioni relative al Libro III

I condomini costituiti in forma di società cooperativa possono conservare tale forma di amministrazione. Ai rapporti di condominio negli edifici di cooperative edilizie le quali godono del contributo dello Stato nel pagamento degli interessi sui mutui si applicano le disposizioni delle leggi speciali.

Legge 13 del 9 gennaio 1989

2. 1. Le deliberazioni che hanno per oggetto le innovazioni da attuare negli edifici privati dirette ad eliminare le barriere architettoniche di cui all’articolo 27, primo comma, della legge 30 marzo 1971, n. 118, ed all’articolo 1, primo comma, del decreto del Presidente della Repubblica 27 aprile 1978, n. 384, nonché la realizzazione di percorsi attrezzati e la installazione di dispositivi di segnalazione atti a favorire la mobilità dei ciechi all’interno degli edifici privati, sono approvate dall’assemblea del condominio, in prima o in seconda convocazione, con le maggioranze previste con le maggioranze previste dal secondo comma dell’articolo 1120 del codice civile.

2 Nel caso in cui il condominio rifiuti di assumere, o non assuma entro tre mesi dalla richiesta fatta per iscritto, le deliberazioni di cui al comma 1, i portatori di handicap, ovvero chi ne esercita la tutela o la potestà di cui al titolo IX del libro primo del codice civile, possono installare, a proprie spese, servoscala nonché strutture mobili e facilmente rimovibili e possono anche modificare l’ampiezza delle porte d’accesso, al fine di rendere più agevole l’accesso agli edifici, agli ascensori e alle rampe dei garages.

Legge 10 del 9 gennaio 1991 

Art 26

2. Per gli interventi in parti comuni di edifici, volti al contenimento del consumo energetico degli edifici stessi ed all’utilizzazione delle fonti di energia di cui all’articolo 1, ivi compresi quelli di cui all’articolo 8, sono valide le relative decisioni prese a maggioranza degli intervenuti, con un numero di voti che rappresenti almeno un terzo del valore dell’edificio.

5. Per le innovazioni relative all’adozione di sistemi di termoregolazione e di contabilizzazione del calore e per il conseguente  riparto degli oneri di riscaldamento in base al consumo effettivamente registrato, l’assemblea di condominio delibera con le maggioranze previste dal secondo comma dell’articolo 1120 del codice civile»

Legge 66 del 20 marzo 2001

Art.2-bis

13. Al fine di favorire lo sviluppo e la diffusione delle nuove tecnologie di radiodiffusione da satellite, le opere di installazione di nuovi impianti sono innovazioni necessarie ai sensi dell’articolo 1120, primo comma, del codice civile. Per l’approvazione delle relative deliberazioni si applica l’articolo 1120, secondo comma, dello stesso codice. Le disposizioni di cui ai precedenti periodi non costituiscono titolo per il riconoscimento di benefici fiscali.

1. I contributi per le spese di manutenzione ordinaria e straordinaria nonché per le innovazioni sono prededucibili ai sensi dell’articolo 111 del regio decreto 16 marzo 1942, n. 267, e successive modificazioni, se divenute esigibili ai sensi dell’articolo 63, primo comma, delle disposizioni per l’attuazione del codice civile e disposizioni transitorie, come sostituito dall’articolo 18 della presente legge, durante le procedure concorsuali.

Regio decreto 267 del 16 marzo 1942 

Art. 111. (Ordine di distribuzione delle somme)

Le somme ricavate dalla liquidazione dell’attivo sono erogate nel seguente ordine:

1)   per il pagamento delle spese, comprese le spese anticipate dall’erario, e dei debiti contratti per l’amministrazione del fallimento e per la continuazione dell’esercizio dell’impresa, se questo è stato autorizzato;

2)   per il pagamento dei crediti ammessi con prelazione sulle cose vendute secondo l’ordine assegnato dalla legge;

3)   per il pagamento dei creditori chirografari,  in proporzione dell’ammontare del credito per cui ciascuno di essi fu ammesso, compresi i creditori indicati al n. 2, qualora non sia stata ancora realizzata la garanzia, ovvero per la parte per cui rimasero non soddisfatti da questa.I prelevamenti indicati al n. 1 sono determinati con decreto dal giudice delegato.

Dispositivo dell’art 23 del Codice di Procedura Civile

Per le cause tra soci [2247 c.c.] è competente il giudice del luogo dove ha sede la società [19; 46 c.c.](1) (2) (3); per le cause tra condomini, ovvero tra condomini e condominio, il giudice del luogo dove si trovano i beni comuni o la maggior parte di essi (4). Tale norma si applica anche dopo lo scioglimento della società o del condominio, purché la domanda sia proposta entro un biennio dalla divisione.
    
    
      `;

      setCivilCode(storedCivilCode);
    };

    fetchRegulation();
    fetchCivilCode();
  }, []);

  return (
    <Dashboard>
      <div className="p-4 h-screen">
        <h2 className="text-2xl font-bold mb-4">Regolamento e Codice Civile</h2>
        
        {/* Sezione delle schede */}
        <div className="mb-8">
          <button
            onClick={() => setActiveTab('regulation')}
            className={`py-2 px-4 rounded-t-lg ${activeTab === 'regulation' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}
          >
            Regolamento Condominiale
          </button>
          <button
            onClick={() => setActiveTab('civilCode')}
            className={`py-2 px-4 rounded-t-lg ml-2 ${activeTab === 'civilCode' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-400'}`}
          >
            Codice Civile
          </button>
        </div>

        {/* Contenuto dinamico in base alla scheda selezionata */}
        <div className="bg-[#2D3748] text-white p-4 rounded-lg shadow-md">
          {activeTab === 'regulation' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Regolamento Condominiale</h3>
              <div className="whitespace-pre-line p-4 bg-gray-700 rounded h-80 overflow-y-auto">
                {regulation}
              </div>
            </div>
          )}
          {activeTab === 'civilCode' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Codice Civile</h3>
              <div className="whitespace-pre-line p-4 bg-gray-700 rounded h-80 overflow-y-auto">
                {civilCode}
              </div>
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
};

export default CondoRegulationPage;
